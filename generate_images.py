import requests
import json
import base64
import os

# Configuration
API_KEY = "AIzaSyB-ptpac0wl_5RCZxE_6RAVWKxvOzeh28g"
MODEL = "imagen-4.0-fast-generate-001" # Latest Imagen 4.0 Fast model
ENDPOINT = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"

IMAGE_PROMPTS = {
    "tatooine.png": "A wide cinematic shot of a bustling trading outpost on Tatooine at sunset, two suns in the sky, sandcrawlers and droids in the distance, high detail, Star Wars aesthetic, 16:9",
    "mon_calamari.png": "A massive underwater shipyard on Mon Cala, giant cruiser hulls under construction, swarms of repair droids, bioluminescent lights, cinematic lighting, 16:9",
    "remnant.png": "A hidden Imperial Remnant base on a snowy mountain peak, stormtroopers patrolling, a damaged TIE fighter in a hangar, cold and clinical atmosphere, 16:9",
    "coruscant.png": "The neon-lit lower levels of Coruscant at night, flying speeders, diverse alien crowds, cyberpunk Star Wars vibe, rain slicked streets, 16:9"
}

def generate_image(prompt, filename):
    print(f"Generating image for: {filename}...")
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {
                "aspectRatio": "16:9"
            }
        }
    }

    try:
        response = requests.post(ENDPOINT, json=payload)
        response.raise_for_status()
        data = response.json()
        
        # Extract base64 image data
        # Based on search: candidates[0].content.parts[0].inlineData.data
        img_data_base64 = data['candidates'][0]['content']['parts'][0]['inlineData']['data']
        img_data = base64.b64decode(img_data_base64)
        
        output_path = os.path.join("images", filename)
        with open(output_path, "wb") as f:
            f.write(img_data)
        print(f"Successfully saved {filename}")
        
    except Exception as e:
        print(f"Error generating {filename}: {str(e)}")
        if 'response' in locals():
            print(f"Response: {response.text}")

if __name__ == "__main__":
    if not os.path.exists("images"):
        os.makedirs("images")
        
    for filename, prompt in IMAGE_PROMPTS.items():
        generate_image(prompt, filename)
