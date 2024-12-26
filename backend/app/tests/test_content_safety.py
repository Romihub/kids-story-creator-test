# backend/tests/test_content_safety.py
import pytest
from app.utils.content_safety import ContentSafetyFilter, StoryValidator

class TestContentSafety:
    @pytest.fixture
    def safety_filter(self):
        return ContentSafetyFilter()
    
    @pytest.fixture
    def story_validator(self):
        return StoryValidator()
    
    def test_content_filtering(self, safety_filter):
        unsafe_content = "The scary monster fought with the angry dragon"
        safe_content = safety_filter.filter_content(unsafe_content, "6-8")
        assert "scary" not in safe_content.lower()
        assert "fought" not in safe_content.lower()
    
    def test_age_appropriate_vocabulary(self, safety_filter):
        complex_content = "The colossal creature was melancholy"
        simple_content = safety_filter.filter_content(complex_content, "3-5")
        assert "big" in simple_content.lower()
        assert "unhappy" in simple_content.lower()
    
    def test_emotional_safety(self, safety_filter):
        negative_content = "Everyone was very sad and crying"
        result = safety_filter._check_emotional_safety(negative_content)
        assert not result
    
    def test_theme_safety(self, safety_filter):
        safe_theme = "Friends helping each other in the garden"
        unsafe_theme = "Fighting in the dark forest"
        assert safety_filter._check_theme_safety(safe_theme)
        assert not safety_filter._check_theme_safety(unsafe_theme)