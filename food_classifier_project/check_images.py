import os
from PIL import Image

def check_images(root_dir):
    bad_files = []
    for root, dirs, files in os.walk(root_dir):
        for name in files:
            file_path = os.path.join(root, name)
            try:
                with Image.open(file_path) as img:
                    img.verify()
            except Exception:
                bad_files.append(file_path)
                print(f"Bad file: {file_path}")
    return bad_files
if __name__ == "__main__":
    bad_files = []
    for folder in ["data/train", "data/val","data/test"]:
        if os.path.exists(folder):
            bad_files.extend(check_images(folder))
    if not bad_files:
       print("no corrupted images")
    else:
        print(f"\n found {len(bad_files)} bad images")

