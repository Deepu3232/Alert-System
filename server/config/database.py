from pymongo import MongoClient
# client = MongoClient("mongodb+srv://hardik:hardik@cluster0.tasf6.mongodb.net/?retryWrites=true&w=majority")
client = MongoClient("mongodb://10.132.25.23:27017/")

db = client.alerts_db

subscriptions = db["subscriptions"] 
