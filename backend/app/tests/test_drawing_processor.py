# backend/tests/test_drawing_processor.py
import pytest
from app.services.drawing_processor import DrawingProcessor
from PIL import Image
import io

class TestDrawingProcessor:
    @pytest.fixture
    def drawing_processor(self):
        return DrawingProcessor()
    
    @pytest.mark.asyncio
    async def test_image_processing(self, drawing_processor):
        # Create test image
        image = Image.new('RGB', (100, 100), color='white')
        buf = io.BytesIO()
        image.save(buf, format='PNG')
        image_data = buf.getvalue()
        
        result = await drawing_processor.process_image(image_data)
        
        assert 'objects' in result
        assert 'scene_type' in result