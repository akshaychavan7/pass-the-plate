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
import base64

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 