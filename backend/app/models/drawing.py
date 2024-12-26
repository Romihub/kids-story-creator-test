# app/models/drawing.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class DrawingBase(BaseModel):
    child_id: str
    image_url: str
    detected_objects: List[dict]
    scene_type: str
    creation_date: datetime = datetime.now()

class DrawingCreate(DrawingBase):
    pass

class Drawing(DrawingBase):
    id: str
    
    class Config:
        orm_mode = True