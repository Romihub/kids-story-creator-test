# app/api/endpoints/drawings.py
from fastapi import APIRouter, HTTPException, Body
from typing import List
from ...models.drawing import DrawingCreate, Drawing
from ...services import drawing_service

router = APIRouter()

@router.post("/drawings/", response_model=Drawing)
async def create_drawing(drawing: DrawingCreate = Body(...)):
    """Create a new drawing"""
    return await drawing_service.create_drawing(drawing)

@router.get("/drawings/", response_model=List[Drawing])
async def list_drawings():
    """Get all drawings"""
    return await drawing_service.list_drawings()

@router.get("/drawings/{drawing_id}", response_model=Drawing)
async def get_drawing(drawing_id: str):
    """Get a specific drawing by ID"""
    drawing = await drawing_service.get_drawing(drawing_id)
    if not drawing:
        raise HTTPException(status_code=404, detail="Drawing not found")
    return drawing

@router.delete("/drawings/{drawing_id}")
async def delete_drawing(drawing_id: str):
    """Delete a drawing"""
    success = await drawing_service.delete_drawing(drawing_id)
    if not success:
        raise HTTPException(status_code=404, detail="Drawing not found")
    return {"message": "Drawing deleted"}

@router.put("/drawings/{drawing_id}", response_model=Drawing)
async def update_drawing(drawing_id: str, drawing: DrawingCreate = Body(...)):
    """Update an existing drawing"""
    updated = await drawing_service.update_drawing(drawing_id, drawing)
    if not updated:
        raise HTTPException(status_code=404, detail="Drawing not found")
    return updated
