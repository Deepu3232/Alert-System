from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Detail(BaseModel):
    contractName: str
    insID: str 
    subscribed: bool
    status: str


class Subscriptions(BaseModel):
    user: str
    alertName: str
    product : str 
    productType : str
    details : List[Detail]
    alertType : str  #This will have comma separated values "121,32423,324523,2131,23423" like this
    threshold : str
    alertStatus : str
    created_at: datetime = datetime.now()
    modified_at: datetime = datetime.now()