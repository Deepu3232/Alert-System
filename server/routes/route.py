from fastapi import APIRouter
from models.subscriptions import Subscriptions
from models.strategy import Strategy
from config.database import subscriptions,alert
from schema.schemas import list_serial
from bson import ObjectId
from pymongo import ReturnDocument
from datetime import datetime
from pydantic import BaseModel
from fastapi import Cookie,Body
from fastapi import HTTPException

class Contract(BaseModel):
    contractID : str
    # name : str


def serialize_document(doc):
    """ Convert MongoDB document with ObjectId to a serializable format. """
    if doc is None:
        return None
    doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
    return doc


def serialize_document2(doc):
    # If the input is a list, serialize each document in the list
    if isinstance(doc, list):
        return [{**d, "_id": str(d["_id"])} for d in doc]
    # If the input is a single document (dict), serialize it
    elif isinstance(doc, dict):
        doc["_id"] = str(doc["_id"])
        return doc
    # If the input is neither, return it as-is
    return doc



router = APIRouter()

@router.post("/updateSubscription")
async def check_existance(subscription: Subscriptions):
    # Convert subscription to dictionary
    subscription_dict = subscription.model_dump()

    print(subscription_dict["product"])
    print(subscription_dict["productType"])

    existing_subscription = subscriptions.find_one({
        "product": subscription.product,
        "productType": subscription.productType
    })

    print(existing_subscription)

    if existing_subscription:
        # Update the existing subscription with new details
        result = subscriptions.find_one_and_update(
            {"product": subscription.product, "productType": subscription.productType},
            {"$set": {"details": subscription_dict["details"]}},
            return_document=True
        )

        return {"success": True, "type" : "previousOneUpdated" , "subscriptions": serialize_document(result)}
    else:
        # Insert new subscription if it does not exist
        subscriptions.insert_one(subscription_dict)
        return {"success": True , "type" : "newInserted"}

# @router.post("/setSubscriptions")
# async def post_subscriptions(subscription : Subscriptions):
#     subscriptions.insert_one(subscription.model_dump())
#     return {"success": True}

@router.post("/setSubscriptions")
async def post_subscriptions(subscription: Subscriptions):
    try:
        print("Received subscription:", subscription)
        result = subscriptions.insert_one(subscription.dict())
        return {"success": True, "inserted_id": str(result.inserted_id)}
    except Exception as e:
        print(f"Error inserting subscription: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")


# @router.post("/setStrategyAlert")
# async def post_subscriptions(strategy : Strategy):
#     subscriptions.insert_one(strategy.model_dump())
#     return {"success": True}

# @router.post("/setStrategyAlert")
# async def post_subscriptions(strategy: Strategy):
#     try:
#         subscriptions.insert_one(strategy.model_dump())
#         return {"success": True}
#     except Exception as e:
#         print("Insert error:", e) 
#         raise HTTPException(status_code=500, detail="Something went wrong.")
@router.post("/setStrategyAlert")
async def post_subscriptions(strategy: Strategy):
    try:
        print("Received strategy:", strategy)
        result = subscriptions.insert_one(strategy.dict())
        return {"success": True, "inserted_id": str(result.inserted_id)}
    except Exception as e:
        print("Insert error:", e)  # 🧠 Add this line
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")



@router.patch("/updateStatus/{id}")
async def update_status(id : str , contract : Contract):
    alertID = ObjectId(id)
    print("AlertID " , alertID)
    # print("contract " , contract)
    cID = contract.contractID
    print("contract id",cID)
    existing_subscription = subscriptions.find_one_and_update(
        {
            "_id" : alertID,
            "details.insID": cID
        },
        {
            "$set" : {
                "details.$.status" : "breached"
            }
        },
        return_document=ReturnDocument.AFTER
        )
    print("Updated subscription:", existing_subscription)

    if existing_subscription:
        alert.insert_one(existing_subscription)

    return {"data" : serialize_document(existing_subscription)} 


# @router.get("/getSubscriptions")
# async def get_subscriptions():
#     # subscriptions_list = list(subscriptions.find({"user" : "hardik.singh"}))
#     subscriptions_list = list(subscriptions.find({"user" : "hardik.singh"}))
#     # print(subscriptions_list)
#     return {"success": True, "subscriptions": serialize_document2(subscriptions_list)}

@router.get("/getSubscriptions")
async def get_subscriptions(username:str=Cookie(default=None)):
    subscriptions_list = list(subscriptions.find({"user" : "rishitha.reddy"}))
    print(username)
    # subscriptions_list = list(subscriptions.find({"user": username}))
    # print(subscriptions_list)
    output = serialize_document2(subscriptions_list)
    return {"success": True, "subscriptions": output}




@router.delete("/deleteAlert/{id}")
async def delete_alert(id: str):
    subscriptions.find_one_and_delete({"_id" : ObjectId(id)})
    return {"success" : True}

@router.patch("/reactivateAlert/{alertId}")
async def reactivate_alert(alertId : str):

    id = ObjectId(alertId)
    result = subscriptions.find_one_and_update(
        {"_id": id},
        {
            "$set": {
                "details.$[].status": "active",
                "modified_at": datetime.now()
            }
        },
        return_document=ReturnDocument.AFTER
    )

    print(result)
    return {"success" : True , "updated_document" : serialize_document(result)}


@router.patch("/updateStrategyAlertStatus/{id}")
async def update_status(id : str):
    alertID = ObjectId(id)
    print("AlertID " , alertID)
    existing_subscription = subscriptions.find_one_and_update(
        {
            "_id" : alertID
        },
        {
            "$set" : {
                "status" : "breached"
            }
        },
        return_document=ReturnDocument.AFTER

        )
    if existing_subscription:
        alert.insert_one(existing_subscription)

    return {"data" : serialize_document(existing_subscription)} 


@router.post("/updateThreshold/{id}")
async def update_threshold(id: str, payload: dict = Body(...)):
    try:
        alert_id = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ObjectId format")

    new_threshold = payload.get("newThreshold")
    if new_threshold is None:
        raise HTTPException(status_code=400, detail="Missing 'newThreshold' in request body")

    result = subscriptions.find_one_and_update(
        {"_id": alert_id},
        {"$set": {"threshold": new_threshold}},
        return_document=ReturnDocument.AFTER
    )

    if not result:
        raise HTTPException(status_code=404, detail="Subscription not found")

    return {"success": True, "updated_document": serialize_document(result)}