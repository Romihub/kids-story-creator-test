# app/models/story.py
class StoryBase(BaseModel):
    drawing_id: str
    narrative: List[dict]
    style: str
    sound_effects: List[dict]
    animations: List[dict]

class StoryCreate(StoryBase):
    pass

class Story(StoryBase):
    id: str
    voice_narration: Optional[str]
    
    class Config:
        orm_mode = True