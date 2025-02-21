# app/models/drawing.py
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from uuid import uuid4

class Point(BaseModel):
    x: float
    y: float
    pressure: Optional[float] = None

class DrawingPath(BaseModel):
    tool: str
    color: str
    strokeWidth: float
    points: List[Point]
    data: str
    pressure: Optional[float] = None
    timestamp: Optional[int] = None

class DrawingBase(BaseModel):
    paths: List[DrawingPath]
    color: str
    strokeWidth: float
    tool: str
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat())
    thumbnailUrl: Optional[str] = None

class DrawingCreate(DrawingBase):
    pass

class Drawing(DrawingBase):
    id: str = Field(default_factory=lambda: str(uuid4()))
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "paths": [{
                    "tool": "pencil",
                    "color": "#000000",
                    "strokeWidth": 2.0,
                    "points": [{"x": 100, "y": 100}],
                    "data": "M100 100",
                    "timestamp": 1613764420000
                }],
                "color": "#000000",
                "strokeWidth": 2.0,
                "tool": "pencil",
                "timestamp": "2024-02-21T06:00:00.000Z",
                "thumbnailUrl": None
            }
        }
