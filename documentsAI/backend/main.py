# main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import base64
import os
from groq import Groq

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set your API key
GROQ_API_KEY = "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"
os.environ["GROQ_API_KEY"] = GROQ_API_KEY
client = Groq()

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    contents = await file.read()
    base64_image = base64.b64encode(contents).decode("utf-8")

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Verify if this image can be a valid Identity card , respond only by yes or no"},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",
                        },
                    },
                ],
            }
        ],
        model="meta-llama/llama-4-maverick-17b-128e-instruct",
    )

    return {"result": chat_completion.choices[0].message.content}
