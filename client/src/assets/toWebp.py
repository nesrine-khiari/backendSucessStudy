import os
from PIL import Image

def convert_to_webp(input_dir, output_dir):
    # Create the output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Iterate through files in the input directory
    for root, _, files in os.walk(input_dir):
        for file in files:
            # Check if the file is an image
            if file.lower().endswith(('.png', '.jpg')):
                input_path = os.path.join(root, file)
                output_path = os.path.join(output_dir, os.path.splitext(file)[0] + '.webp')

                # Open the image
                with Image.open(input_path) as img:
                    # Convert the image to WebP format
                    img.save(output_path, 'WEBP')

                print(f"Converted '{input_path}' to '{output_path}'")

# Specify the input and output directories
input_directory = "images"
output_directory = "webp_images"

# Call the function to convert images
convert_to_webp(input_directory, output_directory)
