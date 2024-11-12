from pymongo import MongoClient
client = MongoClient("mongodb+srv://hardik:hardik@cluster0.tasf6.mongodb.net/?retryWrites=true&w=majority")

db = client.alerts_db

subscriptions = db["subscriptions"] 
