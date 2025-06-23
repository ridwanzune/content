import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import requests
from io import BytesIO

def add_grain_to_faces(image_url: str, output_path: str = "grained_image.jpg"):
    """
    Downloads an image, detects faces, and applies a grain filter to the faces.

    Args:
        image_url: URL of the image to process.
        output_path: Path to save the modified image.
    """
    try:
        # Download the image
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        response = requests.get(image_url, headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes
        img_pil = Image.open(BytesIO(response.content)).convert("RGB")
    except requests.exceptions.RequestException as e:
        print(f"Error downloading image: {e}")
        return
    except IOError:
        print(f"Error opening image. Is the URL pointing to a valid image format?")
        return

    img_cv = np.array(img_pil)
    # Convert RGB to BGR for OpenCV
    img_cv = cv2.cvtColor(img_cv, cv2.COLOR_RGB2BGR)
    gray_cv = cv2.cvtColor(img_cv, cv2.COLOR_BGR2GRAY)

    # Load Haar Cascade for face detection
    # We need to ensure the cascade file is available.
    # For now, let's assume it will be in the same directory or a known path.
    # We'll need to download this file.
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    if face_cascade.empty():
        print("Error loading Haar Cascade. Make sure the XML file is correctly specified.")
        print(f"Attempted path: {cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'}")
        # Try an alternative common path if the first one fails (e.g. in some environments)
        try:
            face_cascade.load('haarcascade_frontalface_default.xml')
            if face_cascade.empty(): # check again
                 print("Still couldn't load cascade from 'haarcascade_frontalface_default.xml'")
                 return
        except Exception as e:
             print(f"Could not load cascade from alternate path: {e}")
             return


    faces = face_cascade.detectMultiScale(gray_cv, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    if len(faces) == 0:
        print("No faces detected.")
        img_pil.save(output_path)
        print(f"Original image saved to {output_path}")
        return

    print(f"Detected {len(faces)} face(s).")

    # Create a PIL Image object from the OpenCV image (which is BGR)
    # Convert BGR to RGB for Pillow
    img_pil_rgb = Image.fromarray(cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB))
    draw = ImageDraw.Draw(img_pil_rgb)

    for (x, y, w, h) in faces:
        # Crop the face region
        face_region_pil = img_pil_rgb.crop((x, y, x + w, y + h))

        # Add grain to the face region
        noise = np.random.randint(-30, 30, (h, w, 3), dtype='int16') # More noticeable grain
        face_np = np.array(face_region_pil).astype('int16')
        grained_face_np = np.clip(face_np + noise, 0, 255).astype('uint8')
        grained_face_pil = Image.fromarray(grained_face_np)

        # Paste the grained face back onto the image
        img_pil_rgb.paste(grained_face_pil, (x, y))

    try:
        img_pil_rgb.save(output_path)
        print(f"Processed image saved to {output_path}")
    except Exception as e:
        print(f"Error saving image: {e}")

if __name__ == '__main__':
    # Example usage:
    # You'll need to provide a direct URL to an image.
    # Using a placeholder - replace with an actual image URL for testing.
    test_image_url_single_face = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/800px-President_Barack_Obama.jpg"
    print(f"\nProcessing Test Image: {test_image_url_single_face}")
    add_grain_to_faces(test_image_url_single_face, "grained_output_image.jpg")

    print("\n--- Test with a known non-face URL (e.g., a text file URL) to check error handling for non-images ---")
    # This URL points to a text file, not an image.
    test_non_image_url = "https://raw.githubusercontent.com/AiderOrg/aider/main/README.md"
    print(f"\nProcessing Non-Image URL: {test_non_image_url}")
    add_grain_to_faces(test_non_image_url, "grained_non_image_test.jpg")


    print("\n--- To test 'no faces detected': use an image URL with no human faces ---")
    print("--- (Skipping automatic test for 'no faces' and 'multiple faces' due to persistent URL fetching issues) ---")
    print("--- Please test manually with an image URL containing no faces, e.g., a landscape. ---")
    print("--- And with an image URL containing multiple faces. ---")
