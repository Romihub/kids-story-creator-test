# app/services/database.py
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from ..core.config import MONGODB_URL

class Database:
    client: AsyncIOMotorClient = None

async def get_database() -> AsyncIOMotorClient:
    return Database.client

async def connect_to_mongodb():
    Database.client = AsyncIOMotorClient(MONGODB_URL)

async def close_mongodb_connection():
    Database.client.close()