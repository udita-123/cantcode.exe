from duckduckgo_search import DDGS
import os, requests

categories = ["rice", "curry", "bread", "fruits", "packaged food", "other"]

with DDGS() as ddgs:
    for c in categories:
        os.makedirs(f"data/train/{c}", exist_ok=True)
        results = ddgs.images(c, max_results=30)
        for i, r in enumerate(results):
            try:
                img = requests.get(r["image"], timeout=10).content
                with open(f"data/train/{c}/{c}_{i}.jpg", "wb") as f:
                    f.write(img)
                print(f"Downloaded {c}_{i}.jpg")
            except Exception as e:
                print(f"Failed {c}_{i}: {e}")

