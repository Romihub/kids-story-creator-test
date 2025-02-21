# backend/app/services/drawing_service.py
from typing import List, Optional
from ..models.drawing import Drawing, DrawingCreate
from ..database import database
from datetime import datetime
from uuid import uuid4

class DrawingService:
    def __init__(self):
        self.db = database.get_db()
        self.collection = self.db.drawings

    async def create_drawing(self, drawing: DrawingCreate) -> Drawing:
        """Create a new drawing"""
        drawing_dict = drawing.dict()
        drawing_dict["id"] = str(uuid4())
        drawing_dict["timestamp"] = datetime.now().isoformat()
        
        # Insert into database
        await self.collection.insert_one(drawing_dict)
        
        return Drawing(**drawing_dict)

    async def get_drawing(self, drawing_id: str) -> Optional[Drawing]:
        """Get a drawing by ID"""
        drawing_dict = await self.collection.find_one({"id": drawing_id})
        if drawing_dict:
            return Drawing(**drawing_dict)
        return None

    async def list_drawings(self) -> List[Drawing]:
        """Get all drawings"""
        cursor = self.collection.find({})
        drawings = []
        async for drawing_dict in cursor:
            drawings.append(Drawing(**drawing_dict))
        return drawings

    async def update_drawing(self, drawing_id: str, drawing: DrawingCreate) -> Optional[Drawing]:
        """Update a drawing"""
        drawing_dict = drawing.dict()
        drawing_dict["timestamp"] = datetime.now().isoformat()
        
        result = await self.collection.update_one(
            {"id": drawing_id},
            {"$set": drawing_dict}
        )
        
        if result.modified_count:
            drawing_dict["id"] = drawing_id
            return Drawing(**drawing_dict)
        return None

    async def delete_drawing(self, drawing_id: str) -> bool:
        """Delete a drawing"""
        result = await self.collection.delete_one({"id": drawing_id})
        return result.deleted_count > 0

    async def generate_thumbnail(self, drawing: Drawing) -> str:
        """Generate a thumbnail URL for the drawing"""
        # TODO: Implement thumbnail generation
        # This could involve:
        # 1. Rendering the SVG paths to a small image
        # 2. Saving to cloud storage
        # 3. Returning the URL
        return None

drawing_service = DrawingService()
