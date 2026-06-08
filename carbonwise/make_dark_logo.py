import os
from PIL import Image

public_dir = '/Users/yashrajdnyaneshwarkuyate/Carbon_Footprint/carbonwise/public'
source_path = os.path.join(public_dir, 'logo-light.png')

try:
    img = Image.open(source_path)
    img = img.convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        r, g, b, a = item
        # Calculate perceived luminance
        luminance = (0.299*r + 0.587*g + 0.114*b)
        
        # If the pixel is dark (luminance < 100), it's likely the dark text.
        # We invert it to white/light blue to make it visible on dark backgrounds.
        # Cyan globe pixels are very bright (high green/blue), so they won't be touched.
        if luminance < 100 and a > 0:
            # Boost brightness significantly for dark mode
            new_r = min(255, int(r * 3 + 100))
            new_g = min(255, int(g * 3 + 100))
            new_b = min(255, int(b * 3 + 150)) # Slight blue tint
            new_data.append((new_r, new_g, new_b, a))
        else:
            new_data.append((r, g, b, a))
            
    img.putdata(new_data)
    img.save(os.path.join(public_dir, 'logo-dark.png'))
    print("Successfully generated true logo-dark.png without CSS inversion!")

except Exception as e:
    print("Error:", str(e))
