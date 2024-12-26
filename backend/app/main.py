# backend/app/main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
from app.services.drawing_processor import DrawingProcessor
from app.services.story_generator import StoryGenerator
from app.core.config import settings

app = FastAPI(title="Kids Story Creator API")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Initialize services
drawing_processor = DrawingProcessor()
story_generator = StoryGenerator()

@app.post("/api/process-drawing")
async def process_drawing(file: UploadFile = File(...)):
    return await drawing_processor.process_image(await file.read())

@app.post("/api/generate-story")
async def generate_story(drawing_data: dict):
    return await story_generator.generate_story(drawing_data)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)