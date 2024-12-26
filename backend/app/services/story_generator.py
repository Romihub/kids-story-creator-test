# backend/app/services/story_generator.py
from transformers import T5Tokenizer, T5ForConditionalGeneration
from app.utils.content_safety import ContentSafetyFilter
import torch

class StoryGenerator:
    def __init__(self):
        # Initialize T5 model for story generation
        self.tokenizer = T5Tokenizer.from_pretrained('t5-base')
        self.model = T5ForConditionalGeneration.from_pretrained('t5-base')
        self.safety_filter = ContentSafetyFilter()
        
    async def generate_story(self, drawing_data: dict):
        try:
            # Create prompt from drawing data
            prompt = self._create_prompt(drawing_data)
            
            # Generate story
            input_ids = self.tokenizer.encode(prompt, return_tensors='pt')
            outputs = self.model.generate(
                input_ids,
                max_length=200,
                num_beams=4,
                no_repeat_ngram_size=2,
                temperature=0.7
            )
            
            story_text = self.tokenizer.decode(outputs[0])
            
            # Apply safety filters
            safe_story = self.safety_filter.filter_content(story_text)
            
            # Structure the story
            return self._structure_story(safe_story)
            
        except Exception as e:
            raise Exception(f"Error generating story: {str(e)}")
    
    def _create_prompt(self, drawing_data: dict):
        objects = drawing_data.get('objects', [])
        scene_type = drawing_data.get('scene_type', 'general')
        
        # Create child-friendly prompt
        prompt = f"""
        Create a short, child-friendly story about:
        Scene: {scene_type}
        Objects: {', '.join([obj['name'] for obj in objects])}
        
        Rules:
        1. Keep it positive and uplifting
        2. Include simple morals or learning
        3. Avoid any scary or negative elements
        4. Use simple, age-appropriate language
        5. Include gentle humor if possible
        """
        
        return prompt
    
    def _structure_story(self, story_text: str):
        # Split into beginning, middle, end
        parts = story_text.split('.')
        third = len(parts) // 3
        
        return {
            'narrative': [
                {
                    'type': 'introduction',
                    'content': '. '.join(parts[:third])
                },
                {
                    'type': 'main',
                    'content': '. '.join(parts[third:2*third])
                },
                {
                    'type': 'conclusion',
                    'content': '. '.join(parts[2*third:])
                }
            ],
            'sound_effects': self._suggest_sound_effects(story_text),
            'animations': self._suggest_animations(story_text)
        }
        
    def _suggest_sound_effects(self, story_text: str):
        # Simple sound effect suggestions
        return [
            {
                'type': 'background',
                'description': 'gentle music',
                'timing': 'throughout'
            }
        ]
        
    def _suggest_animations(self, story_text: str):
        # Simple animation suggestions
        return [
            {
                'type': 'character',
                'description': 'gentle movement',
                'timing': 'continuous'
            }
        ]