from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv
import os
from pydantic import BaseModel
from typing import Optional
import logging
import traceback
from PIL import Image
import io

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
    model = genai.GenerativeModel('gemini-2.5-pro-latest')
    logger.info("Successfully configured Gemini API")
except Exception as e:
    logger.error(f"Failed to configure Gemini API: {str(e)}")
    raise

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
        
        # Convert bytes to PIL Image
        try:
            image = Image.open(io.BytesIO(image_data))
            logger.debug("Successfully converted image data to PIL Image")
        except Exception as e:
            logger.error(f"Failed to convert image data: {str(e)}")
            raise HTTPException(status_code=400, detail="Invalid image format")
        
        # Prepare the prompt for Gemini
        prompt = """Analyze this food image and provide the following information in a structured format:
        1. What is the food item?
        2. How long can it be refrigerated?
        3. What are the nutritional factors?
        4. Which type of people should avoid it?
        5. What is it good for?
        Please provide detailed and accurate information."""

        # Generate response from Gemini
        try:
            logger.debug("Sending request to Gemini API")
            response = model.generate_content(
                contents=[
                    {
                        "role": "user",
                        "parts": [
                            {"text": prompt},
                            {"inline_data": {"mime_type": "image/jpeg", "data": image_data.decode('latin1')}}
                        ]
                    }
                ]
            )
            logger.debug("Received response from Gemini API")
        except Exception as e:
            logger.error(f"Error from Gemini API: {str(e)}")
            logger.error(f"Traceback: {traceback.format_exc()}")
            raise HTTPException(status_code=500, detail=f"Error from Gemini API: {str(e)}")
        
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
                
            if "1." in line:
                current_section = "food_name"
                analysis["food_name"] = line.split("1.")[-1].strip()
            elif "2." in line:
                current_section = "refrigeration_time"
                analysis["refrigeration_time"] = line.split("2.")[-1].strip()
            elif "3." in line:
                current_section = "nutritional_factors"
                analysis["nutritional_factors"] = line.split("3.")[-1].strip()
            elif "4." in line:
                current_section = "health_considerations"
                analysis["health_considerations"] = line.split("4.")[-1].strip()
            elif "5." in line:
                current_section = "benefits"
                analysis["benefits"] = line.split("5.")[-1].strip()
            elif current_section:
                analysis[current_section] += " " + line

        logger.debug(f"Processed analysis: {analysis}")
        return FoodAnalysis(**analysis)

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 