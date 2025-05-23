from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

dbURL = os.getenv("DATABASE_URL")
dbNAME = os.getenv("DATABASE_NAME")
# client = MongoClient("mongodb+srv://hardik:hardik@cluster0.tasf6.mongodb.net/?retryWrites=true&w=majority")
client = MongoClient(dbURL)
# mongodb://admin.alert:alert123@hor-mongodb1.corp.hertshtengroup.com:27017/?authSource=alert

db = client[dbNAME]

subscriptions = db["subscriptions"]
alert=db["alerts"]