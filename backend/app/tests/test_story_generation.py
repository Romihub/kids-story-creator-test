# backend/tests/test_story_generation.py
import pytest
from app.services.story_generator import StoryGenerator

class TestStoryGeneration:
    @pytest.fixture
    def story_generator(self):
        return StoryGenerator()
    
    @pytest.mark.asyncio
    async def test_story_generation(self, story_generator):
        drawing_data = {
            'objects': [
                {'name': 'tree', 'confidence': 0.9},
                {'name': 'bird', 'confidence': 0.8}
            ],
            'scene_type': 'nature'
        }
        
        story = await story_generator.generate_story(drawing_data)
        
        assert 'narrative' in story
        assert 'sound_effects' in story
        assert 'animations' in story
        
    def test_prompt_creation(self, story_generator):
        drawing_data = {
            'objects': [{'name': 'cat'}],
            'scene_type': 'indoor'
        }
        
        prompt = story_generator._create_prompt(drawing_data)
        assert 'cat' in prompt
        assert 'indoor' in prompt
        assert 'child-friendly' in prompt