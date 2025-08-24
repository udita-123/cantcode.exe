import json

classes = ["bread", "curry", "fruits", "other", "packaged", "rice"]  # update with your folders

with open("classes.json", "w") as f:
    json.dump(classes, f)

print("✅ Saved classes.json")

