from groq import Groq
import base64
import os
from langchain_groq import ChatGroq
GROQ_API_KEY = "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"
os.environ["GROQ_API_KEY"] = GROQ_API_KEY

# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

# Path to your image
image_path = "capture.jpg"

# Getting the base64 string
base64_image = encode_image(image_path)

client = Groq()

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Verify if this image can be a valid Identity card , respond only by yes or no "},
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

print(chat_completion.choices[0].message.content)



