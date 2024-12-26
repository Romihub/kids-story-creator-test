# backend/app/services/drawing_processor.py
import torch
from transformers import DetrImageProcessor, DetrForObjectDetection
from PIL import Image
import io

class DrawingProcessor:
    def __init__(self):
        # Initialize DETR model for object detection
        self.processor = DetrImageProcessor.from_pretrained("facebook/detr-resnet-50")
        self.model = DetrForObjectDetection.from_pretrained("facebook/detr-resnet-50")
        
    async def process_image(self, image_data: bytes):
        try:
            # Convert bytes to PIL Image
            image = Image.open(io.BytesIO(image_data))
            
            # Process image with DETR
            inputs = self.processor(images=image, return_tensors="pt")
            outputs = self.model(**inputs)
            
            # Post-process results
            target_sizes = torch.tensor([image.size[::-1]])
            results = self.processor.post_process_object_detection(
                outputs, target_sizes=target_sizes, threshold=0.7
            )[0]
            
            # Format results
            detected_objects = []
            for score, label, box in zip(
                results["scores"], results["labels"], results["boxes"]
            ):
                detected_objects.append({
                    'name': self.model.config.id2label[label.item()],
                    'confidence': score.item(),
                    'box': {
                        'x': box[0].item(),
                        'y': box[1].item(),
                        'width': box[2].item() - box[0].item(),
                        'height': box[3].item() - box[1].item()
                    }
                })
            
            return {
                'objects': detected_objects,
                'scene_type': self._determine_scene_type(detected_objects)
            }
            
        except Exception as e:
            raise Exception(f"Error processing image: {str(e)}")
            
    def _determine_scene_type(self, objects):
        # Simple scene type determination based on detected objects
        object_names = [obj['name'].lower() for obj in objects]
        
        if any(name in ['tree', 'grass', 'flower'] for name in object_names):
            return 'nature'
        elif any(name in ['house', 'building', 'chair'] for name in object_names):
            return 'indoor'
        else:
            return 'general'