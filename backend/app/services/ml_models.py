# backend/app/services/ml_models.py
from transformers import (
    DetrImageProcessor, DetrForObjectDetection,
    T5Tokenizer, T5ForConditionalGeneration,
    ViTImageProcessor, ViTForImageClassification,
    pipeline
)
import torch
from PIL import Image
import io
from typing import Dict, List, Any
import numpy as np

class ModelManager:
    def __init__(self):
        self.models = {}
        self.processors = {}
        self._initialize_models()
        
    def _initialize_models(self):
        """Initialize all model configurations"""
        self.model_configs = {
            'object_detection': {
                'detr': {
                    'model_id': "facebook/detr-resnet-50",
                    'processor': DetrImageProcessor,
                    'model': DetrForObjectDetection
                },
                'yolo': {
                    'pipeline': 'object-detection',
                    'model_id': 'hustvl/yolos-tiny'
                }
            },
            'scene_classification': {
                'vit': {
                    'model_id': 'google/vit-base-patch16-224',
                    'processor': ViTImageProcessor,
                    'model': ViTForImageClassification
                }
            },
            'story_generation': {
                't5': {
                    'model_id': 't5-base',
                    'tokenizer': T5Tokenizer,
                    'model': T5ForConditionalGeneration
                }
            }
        }

class EnhancedDrawingProcessor:
    def __init__(self):
        self.object_detection_models = {
            'detr': self._load_detr_model(),
            'yolo': self._load_yolo_model()
        }
        self.scene_classifier = self._load_scene_classifier()
        self.color_analyzer = ColorAnalyzer()
        
    def _load_detr_model(self):
        processor = DetrImageProcessor.from_pretrained("facebook/detr-resnet-50")
        model = DetrForObjectDetection.from_pretrained("facebook/detr-resnet-50")
        return {'processor': processor, 'model': model}
    
    def _load_yolo_model(self):
        return pipeline('object-detection', model='hustvl/yolos-tiny')
    
    def _load_scene_classifier(self):
        processor = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224')
        model = ViTForImageClassification.from_pretrained('google/vit-base-patch16-224')
        return {'processor': processor, 'model': model}
    
    async def process_image(self, image_data: bytes, 
                          detection_model: str = 'detr') -> Dict:
        """
        Process image using multiple models for comprehensive analysis
        """
        try:
            # Convert bytes to PIL Image
            image = Image.open(io.BytesIO(image_data))
            
            # Process with selected object detection model
            objects = await self._detect_objects(image, detection_model)
            
            # Analyze scene
            scene_info = await self._analyze_scene(image)
            
            # Analyze colors
            color_info = self.color_analyzer.analyze(image)
            
            # Combine all analysis
            return {
                'objects': objects,
                'scene': scene_info,
                'colors': color_info,
                'composition': self._analyze_composition(objects),
                'safe_for_children': self._check_content_safety(objects, scene_info)
            }
            
        except Exception as e:
            raise Exception(f"Error processing image: {str(e)}")
    
    async def _detect_objects(self, image: Image, model: str = 'detr') -> List[Dict]:
        """Detect objects using specified model"""
        if model == 'detr':
            return await self._detect_with_detr(image)
        elif model == 'yolo':
            return await self._detect_with_yolo(image)
        else:
            raise ValueError(f"Unknown detection model: {model}")
    
    async def _detect_with_detr(self, image: Image) -> List[Dict]:
        """Detect objects using DETR model"""
        processor = self.object_detection_models['detr']['processor']
        model = self.object_detection_models['detr']['model']
        
        # Process image
        inputs = processor(images=image, return_tensors="pt")
        outputs = model(**inputs)
        
        # Post-process results
        target_sizes = torch.tensor([image.size[::-1]])
        results = processor.post_process_object_detection(
            outputs, target_sizes=target_sizes, threshold=0.7
        )[0]
        
        # Format results
        detected_objects = []
        for score, label, box in zip(
            results["scores"], results["labels"], results["boxes"]
        ):
            detected_objects.append({
                'name': model.config.id2label[label.item()],
                'confidence': score.item(),
                'box': {
                    'x': box[0].item(),
                    'y': box[1].item(),
                    'width': box[2].item() - box[0].item(),
                    'height': box[3].item() - box[1].item()
                }
            })
            
        return detected_objects
    
    async def _detect_with_yolo(self, image: Image) -> List[Dict]:
        """Detect objects using YOLO model"""
        results = self.object_detection_models['yolo'](image)
        
        detected_objects = []
        for result in results:
            detected_objects.append({
                'name': result['label'],
                'confidence': result['score'],
                'box': {
                    'x': result['box']['x'],
                    'y': result['box']['y'],
                    'width': result['box']['width'],
                    'height': result['box']['height']
                }
            })
            
        return detected_objects
    
    async def _analyze_scene(self, image: Image) -> Dict:
        """Analyze scene using ViT classifier"""
        processor = self.scene_classifier['processor']
        model = self.scene_classifier['model']
        
        # Process image
        inputs = processor(images=image, return_tensors="pt")
        outputs = model(**inputs)
        
        # Get predictions
        probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
        top_pred = torch.argmax(probs, dim=-1)
        
        return {
            'scene_type': model.config.id2label[top_pred.item()],
            'confidence': probs[0][top_pred].item(),
            'attributes': self._get_scene_attributes(image)
        }
    
    def _get_scene_attributes(self, image: Image) -> Dict:
        """Analyze scene attributes (lighting, complexity, etc.)"""
        # Convert to numpy array
        np_image = np.array(image)
        
        # Analyze brightness
        brightness = np.mean(np_image)
        
        # Analyze complexity
        complexity = np.std(np_image)
        
        return {
            'brightness': brightness / 255.0,
            'complexity': complexity / 255.0,
            'size': image.size
        }
    
    def _analyze_composition(self, objects: List[Dict]) -> Dict:
        """Analyze spatial composition of detected objects"""
        if not objects:
            return {'composition_type': 'empty'}
            
        # Analyze object placement
        center_objects = []
        peripheral_objects = []
        
        for obj in objects:
            box = obj['box']
            center_x = box['x'] + box['width']/2
            center_y = box['y'] + box['height']/2
            
            # Check if object is in center third of image
            if 0.33 < center_x < 0.67 and 0.33 < center_y < 0.67:
                center_objects.append(obj['name'])
            else:
                peripheral_objects.append(obj['name'])
                
        return {
            'composition_type': 'centered' if center_objects else 'distributed',
            'central_elements': center_objects,
            'peripheral_elements': peripheral_objects,
            'balance_score': len(peripheral_objects) / (len(objects) + 1)
        }
    
    def _check_content_safety(self, objects: List[Dict], 
                            scene_info: Dict) -> Dict:
        """Check if content is appropriate for children"""
        unsafe_objects = ['knife', 'gun', 'sword', 'blood']
        unsafe_scenes = ['violence', 'horror', 'danger']
        
        detected_unsafe = [obj['name'] for obj in objects 
                         if obj['name'].lower() in unsafe_objects]
        
        scene_safe = scene_info['scene_type'].lower() not in unsafe_scenes
        
        return {
            'is_safe': not detected_unsafe and scene_safe,
            'unsafe_elements': detected_unsafe,
            'scene_safety': scene_safe,
            'recommendations': self._get_safety_recommendations(
                detected_unsafe, scene_info
            )
        }
    
    def _get_safety_recommendations(self, unsafe_elements: List[str],
                                  scene_info: Dict) -> List[str]:
        """Generate safety recommendations based on detected issues"""
        recommendations = []
        
        if unsafe_elements:
            recommendations.append(
                f"Remove or replace unsafe elements: {', '.join(unsafe_elements)}"
            )
            
        if not scene_info.get('scene_safety', True):
            recommendations.append(
                f"Consider changing scene type from {scene_info['scene_type']}"
            )
            
        return recommendations

class ColorAnalyzer:
    def __init__(self):
        self.color_names = self._load_color_names()
        
    def analyze(self, image: Image) -> Dict:
        """Analyze color composition of image"""
        # Convert image to RGB if not already
        image = image.convert('RGB')
        
        # Get color histogram
        colors = image.getcolors(image.size[0] * image.size[1])
        
        if not colors:
            return {'error': 'Could not analyze colors'}
            
        # Sort colors by frequency
        sorted_colors = sorted(colors, reverse=True)
        
        # Analyze top colors
        return {
            'dominant_colors': self._get_dominant_colors(sorted_colors[:5]),
            'color_mood': self._analyze_color_mood(sorted_colors),
            'palette': self._create_color_palette(sorted_colors[:5])
        }
    
    def _get_dominant_colors(self, color_counts: List) -> List[Dict]:
        """Get dominant colors with their names"""
        dominant = []
        for count, rgb in color_counts:
            dominant.append({
                'rgb': rgb,
                'name': self._get_color_name(rgb),
                'percentage': count / sum(c for c, _ in color_counts)
            })
        return dominant
    
    def _analyze_color_mood(self, colors: List) -> Dict:
        """Analyze mood based on color composition"""
        # Simple mood analysis based on color properties
        total_brightness = 0
        total_saturation = 0
        
        for _, rgb in colors:
            h, s, v = self._rgb_to_hsv(rgb)
            total_brightness += v
            total_saturation += s
            
        avg_brightness = total_brightness / len(colors)
        avg_saturation = total_saturation / len(colors)
        
        return {
            'brightness': avg_brightness,
            'saturation': avg_saturation,
            'mood': self._determine_mood(avg_brightness, avg_saturation)
        }
    
    def _determine_mood(self, brightness: float, saturation: float) -> str:
        """Determine mood based on color properties"""
        if brightness > 0.7 and saturation > 0.5:
            return 'cheerful'
        elif brightness > 0.7 and saturation < 0.3:
            return 'peaceful'
        elif brightness < 0.3:
            return 'mysterious'
        else:
            return 'balanced'
    
    @staticmethod
    def _rgb_to_hsv(rgb: tuple) -> tuple:
        """Convert RGB to HSV color space"""
        r, g, b = [x/255.0 for x in rgb]
        cmax = max(r, g, b)
        cmin = min(r, g, b)
        diff = cmax - cmin
        
        if cmax == cmin:
            h = 0
        elif cmax == r:
            h = (60 * ((g-b)/diff) + 360) % 360
        elif cmax == g:
            h = (60 * ((b-r)/diff) + 120) % 360
        else:
            h = (60 * ((r-g)/diff) + 240) % 360
            
        s = 0 if cmax == 0 else diff/cmax
        v = cmax
        
        return h, s, v