from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv
import os
from pydantic import BaseModel
from typing import Optional, Dict, List
import logging
import traceback
from PIL import Image
import io
import base64
import hashlib
from datetime import datetime, timedelta
import json

# Configure logging
logging.basicConfig(level=logging.DEBUG)  # Changed to DEBUG level
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Configure Google Gemini API
api_key = os.getenv("GOOGLE_API_KEY")
logger.debug(f"API Key present: {'Yes' if api_key else 'No'}")

if not api_key:
    raise ValueError("GOOGLE_API_KEY environment variable is not set")

try:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.5-pro-preview-05-06')
    logger.info("Successfully configured Gemini API")
except Exception as e:
    logger.error(f"Failed to configure Gemini API: {str(e)}")
    raise

# Cache configuration
class CacheEntry:
    def __init__(self, data: dict, timestamp: datetime):
        self.data = data
        self.timestamp = timestamp

# In-memory cache with expiration
class Cache:
    def __init__(self, expiration_hours: int = 24):
        self.cache: Dict[str, CacheEntry] = {}
        self.expiration_hours = expiration_hours

    def get(self, key: str) -> Optional[dict]:
        if key not in self.cache:
            return None
        
        entry = self.cache[key]
        if datetime.now() - entry.timestamp > timedelta(hours=self.expiration_hours):
            del self.cache[key]
            return None
        
        return entry.data

    def set(self, key: str, data: dict):
        self.cache[key] = CacheEntry(data, datetime.now())

    def clear_expired(self):
        now = datetime.now()
        expired_keys = [
            key for key, entry in self.cache.items()
            if now - entry.timestamp > timedelta(hours=self.expiration_hours)
        ]
        for key in expired_keys:
            del self.cache[key]

# Initialize caches
image_cache = Cache()
environmental_cache = Cache()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FoodAnalysis(BaseModel):
    food_name: str
    refrigeration_time: Optional[str]
    nutritional_factors: Optional[str]
    health_considerations: Optional[str]
    benefits: Optional[str]
    additional_info: Optional[str]

class FoodItem(BaseModel):
    name: str
    quantity: float
    unit: str
    category: str
    packaging: str
    isLocal: bool

class EnvironmentalImpact(BaseModel):
    carbonFootprint: float
    waterUsage: float
    packagingWaste: float
    foodMiles: float

class EnvironmentalImpactRequest(BaseModel):
    foodItems: List[FoodItem]
    totalImpact: EnvironmentalImpact

def calculate_image_hash(image_data: bytes) -> str:
    """Calculate a hash of the image data for caching."""
    return hashlib.sha256(image_data).hexdigest()

def calculate_cache_key(food_items: List[FoodItem], total_impact: EnvironmentalImpact) -> str:
    """Calculate a unique cache key for environmental impact recommendations."""
    # Create a string representation of the input data
    data_str = json.dumps({
        "food_items": [item.dict() for item in food_items],
        "total_impact": total_impact.dict()
    }, sort_keys=True)
    # Create a hash of the string
    return hashlib.sha256(data_str.encode()).hexdigest()

@app.post("/analyze-food-image/", response_model=FoodAnalysis)
async def analyze_food_image(file: UploadFile = File(...)):
    try:
        logger.debug(f"Received request for file: {file.filename}")
        
        # Read the image file
        image_data = await file.read()
        if not image_data:
            logger.error("No image data received")
            raise HTTPException(status_code=400, detail="No image data received")
        
        logger.debug(f"Image size: {len(image_data)} bytes")
        
        # Calculate image hash for caching
        image_hash = calculate_image_hash(image_data)
        
        # Check cache first
        cached_result = image_cache.get(image_hash)
        if cached_result:
            logger.debug("Returning cached result")
            return FoodAnalysis(**cached_result)
        
        # Validate image size
        if len(image_data) < 100:  # Arbitrary minimum size to ensure we have actual image data
            logger.error(f"Image data too small: {len(image_data)} bytes")
            raise HTTPException(status_code=400, detail="Invalid image: Image data too small")
        
        # Convert bytes to PIL Image
        try:
            image = Image.open(io.BytesIO(image_data))
            # Validate image format
            if image.format not in ['JPEG', 'PNG']:
                logger.error(f"Unsupported image format: {image.format}")
                raise HTTPException(status_code=400, detail=f"Unsupported image format: {image.format}. Please use JPEG or PNG.")
            
            # Convert to JPEG if needed
            if image.format != 'JPEG':
                output = io.BytesIO()
                image = image.convert('RGB')
                image.save(output, format='JPEG', quality=90)
                image_data = output.getvalue()
            
            logger.debug("Successfully converted image data to PIL Image")
        except Exception as e:
            logger.error(f"Failed to process image data: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Invalid image format: {str(e)}")
        
        # Prepare the prompt for Gemini
        prompt = """Analyze this food image and provide the following information in a structured format. For each section, provide a clear, concise answer without bullet points or markdown formatting:

        1. Food Name: What is the food item? (Provide just the name)
        2. Refrigeration Time: How long can it be refrigerated? (Provide a clear time period)
        3. Nutritional Factors: What are the key nutritional components? (List main nutrients)
        4. Health Considerations: Who should avoid or limit this food? (List specific groups)
        5. Benefits: What are the main health benefits? (List key benefits)
        6. Additional Info: Any other important information about storage, preparation, or consumption?

        Please provide clear, concise answers without bullet points, markdown, or excessive formatting."""

        # Generate response from Gemini
        try:
            logger.debug("Sending request to Gemini API")
            
            # Convert image to base64
            image_base64 = base64.b64encode(image_data).decode('utf-8')
            
            response = model.generate_content(
                contents=[
                    {
                        "role": "user",
                        "parts": [
                            {"text": prompt},
                            {
                                "inline_data": {
                                    "mime_type": "image/jpeg",
                                    "data": image_base64
                                }
                            }
                        ]
                    }
                ]
            )
            logger.debug("Received response from Gemini API")
            
            # Parse the response and structure it
            response_text = response.text
            logger.debug(f"Raw response from Gemini: {response_text}")
            
            # Basic parsing of the response
            lines = response_text.split('\n')
            analysis = {
                "food_name": "",
                "refrigeration_time": "",
                "nutritional_factors": "",
                "health_considerations": "",
                "benefits": "",
                "additional_info": ""
            }
            
            current_section = None
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                    
                if "1. Food Name:" in line:
                    current_section = "food_name"
                    analysis["food_name"] = line.split("1. Food Name:")[-1].strip()
                elif "2. Refrigeration Time:" in line:
                    current_section = "refrigeration_time"
                    analysis["refrigeration_time"] = line.split("2. Refrigeration Time:")[-1].strip()
                elif "3. Nutritional Factors:" in line:
                    current_section = "nutritional_factors"
                    analysis["nutritional_factors"] = line.split("3. Nutritional Factors:")[-1].strip()
                elif "4. Health Considerations:" in line:
                    current_section = "health_considerations"
                    analysis["health_considerations"] = line.split("4. Health Considerations:")[-1].strip()
                elif "5. Benefits:" in line:
                    current_section = "benefits"
                    analysis["benefits"] = line.split("5. Benefits:")[-1].strip()
                elif "6. Additional Info:" in line:
                    current_section = "additional_info"
                    analysis["additional_info"] = line.split("6. Additional Info:")[-1].strip()
                elif current_section:
                    analysis[current_section] += " " + line

            # Clean up the responses
            for key in analysis:
                # Remove any remaining markdown or bullet points
                analysis[key] = analysis[key].replace('*', '').replace('-', '').strip()
                # Remove multiple spaces
                analysis[key] = ' '.join(analysis[key].split())
                # Remove any remaining section numbers
                analysis[key] = analysis[key].replace('1.', '').replace('2.', '').replace('3.', '').replace('4.', '').replace('5.', '').replace('6.', '').strip()

            # Cache the result
            image_cache.set(image_hash, analysis)
            
            logger.debug(f"Processed analysis: {analysis}")
            return FoodAnalysis(**analysis)

        except Exception as e:
            logger.error(f"Error from Gemini API: {str(e)}")
            logger.error(f"Traceback: {traceback.format_exc()}")
            raise HTTPException(status_code=500, detail=f"Error from Gemini API: {str(e)}")

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/environmental-impact")
async def get_environmental_recommendations(request: EnvironmentalImpactRequest):
    try:
        # Calculate cache key
        cache_key = calculate_cache_key(request.foodItems, request.totalImpact)
        logger.debug(f"Cache key for environmental impact: {cache_key}")
        
        # Check cache first
        cached_result = environmental_cache.get(cache_key)
        if cached_result:
            logger.debug("Returning cached environmental impact recommendations")
            return cached_result

        logger.debug("Cache miss, calling Gemini API")

        # Prepare prompt for Gemini
        prompt = f"""Given the following food items and their environmental impact:
{request.foodItems}

Total Environmental Impact:
{request.totalImpact}

Please provide 3-5 specific, actionable recommendations to reduce the environmental impact of these food items. Consider:
1. Food choices and alternatives
2. Packaging options
3. Transportation and sourcing
4. Storage and preservation
5. Waste reduction

IMPORTANT: Format your response as a Python list of strings, with each recommendation as a separate string. For example:
[
    "Consider buying local produce to reduce food miles",
    "Choose products with minimal packaging",
    "Store food properly to reduce waste"
]"""

        # Generate content using Gemini
        response = model.generate_content(prompt)
        
        if not response.text:
            raise HTTPException(status_code=500, detail="No response from Gemini API")

        # Parse the response
        try:
            # Clean up the response text
            response_text = response.text.strip()
            
            # If the response starts with ```python and ends with ```, remove them
            if response_text.startswith("```python"):
                response_text = response_text[9:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            
            # Remove any leading/trailing whitespace
            response_text = response_text.strip()
            
            # Try to parse as Python list
            recommendations = eval(response_text)
            
            # Validate that it's a list of strings
            if not isinstance(recommendations, list):
                raise ValueError("Response is not a list")
            
            if not all(isinstance(rec, str) for rec in recommendations):
                raise ValueError("Response contains non-string items")
            
            # Limit to 5 recommendations
            recommendations = recommendations[:5]
            
            result = {"recommendations": recommendations}
            
            # Cache the result
            logger.debug("Caching environmental impact recommendations")
            environmental_cache.set(cache_key, result)
            
            return result
            
        except Exception as e:
            logger.error(f"Failed to parse Gemini response: {str(e)}")
            logger.error(f"Raw response: {response.text}")
            raise HTTPException(
                status_code=500, 
                detail=f"Failed to parse Gemini response: {str(e)}. Raw response: {response.text}"
            )

    except Exception as e:
        logger.error(f"Error in environmental impact API: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 