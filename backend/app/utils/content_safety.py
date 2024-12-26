# backend/app/utils/content_safety.py
import re
from typing import Dict, List, Optional
from better_profanity import profanity
from textblob import TextBlob
import spacy

class ContentSafetyFilter:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")
        self.profanity_filter = profanity
        self.age_vocabulary = self._load_age_vocabulary()
        self.safe_themes = self._load_safe_themes()
        
    def filter_content(self, content: str, age_group: str = "6-8") -> str:
        """Apply all safety filters to content"""
        try:
            # Basic cleaning
            cleaned_content = self._clean_text(content)
            
            # Safety checks
            if not self._is_content_safe(cleaned_content):
                raise ValueError("Content failed safety check")
            
            # Age-appropriate vocabulary
            safe_content = self._apply_age_vocabulary(cleaned_content, age_group)
            
            # Theme check
            if not self._check_theme_safety(safe_content):
                raise ValueError("Content theme not appropriate")
            
            # Emotional safety check
            if not self._check_emotional_safety(safe_content):
                raise ValueError("Content emotional tone not appropriate")
            
            return safe_content
            
        except Exception as e:
            return self._get_fallback_content(str(e))
    
    def _clean_text(self, text: str) -> str:
        """Clean and normalize text"""
        # Remove profanity
        clean_text = self.profanity_filter.censor(text)
        
        # Remove unsafe patterns
        clean_text = self._remove_unsafe_patterns(clean_text)
        
        # Normalize spacing and punctuation
        clean_text = " ".join(clean_text.split())
        
        return clean_text
    
    def _is_content_safe(self, text: str) -> bool:
        """Check if content meets safety criteria"""
        doc = self.nlp(text)
        
        # Check for unsafe entities
        unsafe_entities = ['WEAPON', 'CRIME', 'VIOLENCE']
        if any(ent.label_ in unsafe_entities for ent in doc.ents):
            return False
        
        # Check for unsafe word combinations
        unsafe_combinations = [
            ('bad', 'scary'),
            ('hurt', 'pain'),
            ('fight', 'hit')
        ]
        tokens = [token.text.lower() for token in doc]
        for combo in unsafe_combinations:
            if all(word in tokens for word in combo):
                return False
        
        return True
    
    def _apply_age_vocabulary(self, text: str, age_group: str) -> str:
        """Replace complex words with age-appropriate alternatives"""
        doc = self.nlp(text)
        age_vocab = self.age_vocabulary[age_group]
        
        new_text = []
        for token in doc:
            if token.text.lower() in age_vocab:
                new_text.append(age_vocab[token.text.lower()])
            else:
                new_text.append(token.text)
                
        return " ".join(new_text)
    
    def _check_theme_safety(self, text: str) -> bool:
        """Check if theme is appropriate for children"""
        doc = self.nlp(text)
        
        # Extract main themes
        themes = set()
        for chunk in doc.noun_chunks:
            themes.add(chunk.root.text.lower())
        
        # Check if at least one safe theme is present
        return any(theme in self.safe_themes for theme in themes)
    
    def _check_emotional_safety(self, text: str) -> bool:
        """Check emotional tone of content"""
        blob = TextBlob(text)
        sentiment = blob.sentiment
        
        # Ensure positive or neutral sentiment
        if sentiment.polarity < -0.1:
            return False
        
        # Check for overwheming emotions
        if abs(sentiment.subjectivity) > 0.8:
            return False
        
        return True
    
    def _get_fallback_content(self, error: str) -> str:
        """Provide safe fallback content if safety checks fail"""
        fallback_templates = [
            "Once upon a time, there was a friendly animal who loved to play and make friends.",
            "In a beautiful garden, flowers danced in the gentle breeze while butterflies flew by.",
            "A kind child shared their toys with friends, making everyone happy."
        ]
        
        return fallback_templates[0]
    
    def _load_age_vocabulary(self) -> Dict:
        """Load age-appropriate vocabulary"""
        return {
            "3-5": {
                "sad": "unhappy",
                "angry": "upset",
                "difficult": "hard",
                "enormous": "big"
            },
            "6-8": {
                "melancholy": "sad",
                "furious": "angry",
                "challenging": "hard",
                "gigantic": "very big"
            },
            "9-12": {
                "depressed": "very sad",
                "enraged": "very angry",
                "arduous": "very hard",
                "colossal": "very big"
            }
        }
    
    def _load_safe_themes(self) -> Set[str]:
        """Load safe themes for children's content"""
        return {
            "friendship",
            "sharing",
            "helping",
            "learning",
            "family",
            "nature",
            "animals",
            "kindness",
            "adventure",
            "discovery"
        }

class StoryValidator:
    def __init__(self):
        self.safety_filter = ContentSafetyFilter()
        
    def validate_story(self, story: Dict, age_group: str) -> Dict:
        """Validate complete story including narrative and effects"""
        validation_results = {
            'is_safe': True,
            'issues': [],
            'modified_content': {}
        }
        
        try:
            # Validate narrative
            safe_narrative = self._validate_narrative(
                story.get('narrative', []), 
                age_group
            )
            validation_results['modified_content']['narrative'] = safe_narrative
            
            # Validate sound effects
            safe_sounds = self._validate_sound_effects(
                story.get('sound_effects', [])
            )
            validation_results['modified_content']['sound_effects'] = safe_sounds
            
            # Validate animations
            safe_animations = self._validate_animations(
                story.get('animations', [])
            )
            validation_results['modified_content']['animations'] = safe_animations
            
        except Exception as e:
            validation_results['is_safe'] = False
            validation_results['issues'].append(str(e))
            validation_results['modified_content'] = self._get_fallback_story()
        
        return validation_results
    
    def _validate_narrative(self, narrative: List[Dict], 
                          age_group: str) -> List[Dict]:
        """Validate and clean narrative content"""
        safe_narrative = []
        
        for section in narrative:
            safe_content = self.safety_filter.filter_content(
                section['content'],
                age_group
            )
            safe_narrative.append({
                **section,
                'content': safe_content
            })
        
        return safe_narrative
    
    def _validate_sound_effects(self, sound_effects: List[Dict]) -> List[Dict]:
        """Validate sound effects for safety"""
        safe_sounds = []
        unsafe_sounds = {'crash', 'bang', 'explosion', 'scream', 'yell'}
        
        for effect in sound_effects:
            if not any(unsafe in effect['description'].lower() 
                      for unsafe in unsafe_sounds):
                safe_sounds.append(effect)
        
        return safe_sounds
    
    def _validate_animations(self, animations: List[Dict]) -> List[Dict]:
        """Validate animations for safety"""
        safe_animations = []
        unsafe_animations = {'violent', 'scary', 'threatening', 'rapid'}
        
        for animation in animations:
            if not any(unsafe in animation['description'].lower() 
                      for unsafe in unsafe_animations):
                safe_animations.append(animation)
        
        return safe_animations
    
    def _get_fallback_story(self) -> Dict:
        """Provide safe fallback story if validation fails"""
        return {
            'narrative': [
                {
                    'type': 'introduction',
                    'content': 'Once upon a time, in a beautiful garden...'
                },
                {
                    'type': 'main',
                    'content': 'A friendly butterfly flew from flower to flower...'
                },
                {
                    'type': 'conclusion',
                    'content': 'Everyone had a wonderful time in the garden.'
                }
            ],
            'sound_effects': [
                {
                    'type': 'background',
                    'description': 'gentle breeze',
                    'timing': 'throughout'
                }
            ],
            'animations': [
                {
                    'type': 'character',
                    'description': 'gentle flutter',
                    'timing': 'continuous'
                }
            ]
        }