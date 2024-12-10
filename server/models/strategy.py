from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Detail(BaseModel):
    product: str
    mult: str 
    selectedContract: str
    contractName: str

class Strategy(BaseModel):
    user: str
    alertType: str
    alertName: str
    threshold: str 
    status: str
    details: List[Detail]
    created_at: datetime = datetime.now()
    modified_at: datetime = datetime.now()