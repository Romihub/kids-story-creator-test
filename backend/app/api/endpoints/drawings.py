# app/api/endpoints/drawings.py
from fastapi import APIRouter, UploadFile, File
from ...services import drawing_service

router = APIRouter()

@router.post("/drawings/")
async def create_drawing(
    file: UploadFile = File(...),
    child_id: str
):
    return await drawing_service.create_drawing(file, child_id)

@router.get("/drawings/{drawing_id}")
async def get_drawing(drawing_id: str):
    return await drawing_service.get_drawing(drawing_id)