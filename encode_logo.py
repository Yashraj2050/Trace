import os
import base64

public_dir = '/Users/yashrajdnyaneshwarkuyate/Carbon_Footprint/carbonwise/public'
source_path = os.path.join(public_dir, 'logo-light.png')

with open(source_path, "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

lib_dir = '/Users/yashrajdnyaneshwarkuyate/Carbon_Footprint/carbonwise/lib'
if not os.path.exists(lib_dir):
    os.makedirs(lib_dir)

ts_content = f'export const TraceLogoBase64 = "data:image/png;base64,{encoded_string}";\n'

with open(os.path.join(lib_dir, 'logoBase64.ts'), 'w') as ts_file:
    ts_file.write(ts_content)

print("Base64 string generated successfully!")
