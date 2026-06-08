import os
from PIL import Image

public_dir = '/Users/yashrajdnyaneshwarkuyate/Carbon_Footprint/carbonwise/public'
source_path = os.path.join(public_dir, 'source-logo.png')

try:
    img = Image.open(source_path)
    img = img.convert("RGBA")
    data = img.getdata()
    width, height = img.size
    
    # Find bounding box of the Cyan globe
    # Cyan has high green and blue, and the globe is specifically very bright cyan
    min_x = width
    min_y = height
    max_x = 0
    max_y = 0
    
    found = False
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = data[y * width + x]
            # Cyan detection: high Green and Blue, relatively lower Red
            # Plus alpha must be visible
            if a > 50 and g > 120 and b > 150 and (g > r + 30 or b > r + 30):
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                found = True
                
    if not found:
        print("Could not isolate cyan globe based on color thresholds. Falling back to right-side crop.")
        # Fallback: crop the right 25% of the image
        min_x = int(width * 0.75)
        max_x = width
        min_y = 0
        max_y = height

    # Add a small margin to the crop box
    margin = int((max_x - min_x) * 0.1)
    min_x = max(0, min_x - margin)
    max_x = min(width, max_x + margin)
    min_y = max(0, min_y - margin)
    max_y = min(height, max_y + margin)

    # Ensure it's perfectly square for favicons
    box_w = max_x - min_x
    box_h = max_y - min_y
    size = max(box_w, box_h)
    
    # Adjust center
    center_x = min_x + box_w // 2
    center_y = min_y + box_h // 2
    
    crop_min_x = max(0, center_x - size // 2)
    crop_max_x = min(width, center_x + size // 2)
    crop_min_y = max(0, center_y - size // 2)
    crop_max_y = min(height, center_y + size // 2)

    globe_img = img.crop((crop_min_x, crop_min_y, crop_max_x, crop_max_y))
    
    # Generate requested favicons
    # 32x32
    fav32 = globe_img.copy()
    fav32.thumbnail((32, 32), Image.Resampling.LANCZOS)
    fav32.save(os.path.join(public_dir, 'favicon-32x32.png'))

    # 16x16
    fav16 = globe_img.copy()
    fav16.thumbnail((16, 16), Image.Resampling.LANCZOS)
    fav16.save(os.path.join(public_dir, 'favicon-16x16.png'))

    # apple touch 180x180
    apple = globe_img.copy()
    apple.thumbnail((180, 180), Image.Resampling.LANCZOS)
    apple.save(os.path.join(public_dir, 'apple-touch-icon.png'))

    # .ico
    globe_img.save(os.path.join(public_dir, 'favicon.ico'), format='ICO', sizes=[(32, 32)])

    print("Successfully cropped globe and generated isolated favicons!")

except Exception as e:
    print("Error:", str(e))
