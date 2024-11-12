from fastapi import APIRouter
from models.subscriptions import Subscriptions
from config.database import subscriptions
from schema.schemas import list_serial
from bson import ObjectId
from pymongo import ReturnDocument
from datetime import datetime

def serialize_document(doc):
    """ Convert MongoDB document with ObjectId to a serializable format. """
    if doc is None:
        return None
    doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
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

@router.get("/getSubscriptions")
async def get_subscriptions():
    subscriptions_list = list(subscriptions.find({"user" : "hardik.singh"}))
    return {"success": True, "subscriptions": list_serial(subscriptions_list)}

@router.post("/updateStatus")
async def update_status(subscription : Subscriptions):
        # Convert subscription to dictionary
    subscription_dict = subscription.model_dump()
    id = subscription_dict["_id"]
    print(subscription_dict["_id"])
    print(subscription_dict["product"])
    print(subscription_dict["productType"])

    existing_subscription = subscriptions.find_one({"_id" : id})

    print(existing_subscription)
    result = subscriptions.find_one_and_update(
        {"_id": id },
        {"$set": {"status": "breached"}},
        return_document=True
    )

    return {"success": True, "type" : "previousOneUpdated" , "subscriptions": serialize_document(result)}

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