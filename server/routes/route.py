from fastapi import APIRouter
from models.subscriptions import Subscriptions
from models.strategy import Strategy
from config.database import subscriptions
from schema.schemas import list_serial
from bson import ObjectId
from pymongo import ReturnDocument
from datetime import datetime
from pydantic import BaseModel

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

@router.post("/setSubscriptions")
async def post_subscriptions(subscription : Subscriptions):
    subscriptions.insert_one(subscription.model_dump())
    return {"success": True}

@router.post("/setStrategyAlert")
async def post_subscriptions(strategy : Strategy):
    subscriptions.insert_one(strategy.model_dump())
    return {"success": True}

@router.patch("/updateStatus/{id}")
async def update_status(id : str , contract : Contract):
    alertID = ObjectId(id)
    print("AlertID " , alertID)
    # print("contract " , contract)
    cID = contract.contractID
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

    return {"data" : serialize_document(existing_subscription)} 


@router.get("/getSubscriptions")
async def get_subscriptions():
    # subscriptions_list = list(subscriptions.find({"user" : "hardik.singh"}))
    subscriptions_list = list(subscriptions.find({"user" : "hardik.singh"}))
    # print(subscriptions_list)
    return {"success": True, "subscriptions": serialize_document2(subscriptions_list)}



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

    return {"data" : serialize_document(existing_subscription)} 