import os
from PIL import Image

public_dir = '/Users/yashrajdnyaneshwarkuyate/Carbon_Footprint/carbonwise/public'
source_path = os.path.join(public_dir, 'source-logo.png')

try:
    img = Image.open(source_path)
    img = img.convert("RGBA")

    # Crop whitespace if any (simple bounding box)
    bg = Image.new(img.mode, img.size, img.getpixel((0,0)))
    diff = Image.chops.difference(img, bg) if hasattr(Image, 'chops') else img
    # actually let's just resize to avoid PIL chops missing

    # Generate standard logos
    logo_light = img.copy()
    logo_light.thumbnail((512, 512))
    logo_light.save(os.path.join(public_dir, 'logo-light.png'))
    
    # We will use logo-light for dark as well, and use CSS `dark:invert` or similar if needed.
    logo_light.save(os.path.join(public_dir, 'logo-dark.png'))

    # Generate favicons
    # 32x32
    fav32 = img.copy()
    fav32.thumbnail((32, 32))
    fav32.save(os.path.join(public_dir, 'favicon-32x32.png'))

    # 16x16
    fav16 = img.copy()
    fav16.thumbnail((16, 16))
    fav16.save(os.path.join(public_dir, 'favicon-16x16.png'))

    # apple touch 180x180
    apple = img.copy()
    apple.thumbnail((180, 180))
    apple.save(os.path.join(public_dir, 'apple-touch-icon.png'))

    # og-logo
    og = img.copy()
    og.thumbnail((1200, 630))
    og.save(os.path.join(public_dir, 'og-logo.png'))

    # .ico
    img.save(os.path.join(public_dir, 'favicon.ico'), format='ICO', sizes=[(32, 32)])

    print("Success: Generated all logo variants.")

except Exception as e:
    print("Error:", str(e))
