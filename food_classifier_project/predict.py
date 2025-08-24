#!/usr/bin/env python3
# predict.py

import argparse
import json
import torch
import torch.nn.functional as F
from PIL import Image
from torchvision import transforms
from model_def import FoodClassifier  # your model class

# ----------------- LOAD CLASSES -----------------
def load_classes(path="classes.json"):
    with open(path, "r") as f:
        raw = json.load(f)
    if isinstance(raw, dict):
        items = sorted(raw.items(), key=lambda kv: int(kv[0]))
        classes = [v for k, v in items]
    elif isinstance(raw, list):
        classes = raw
    else:
        raise RuntimeError("classes.json must be list or dict")
    return classes

# ----------------- LOAD MODEL -----------------
def build_model(num_classes, ckpt_path):
    model = FoodClassifier(num_classes=num_classes)
    sd = torch.load(ckpt_path, map_location="cpu")
    if "state_dict" in sd:
        sd = sd["state_dict"]

    # strip 'module.' prefix if present
    sd = { (k[len("module."): ] if k.startswith("module.") else k): v for k,v in sd.items() }

    # attempt direct load
    try:
        model.load_state_dict(sd)
        print("✅ Loaded checkpoint: direct match")
    except:
        # attempt loading into model.model (backbone)
        if hasattr(model, "model"):
            try:
                model.model.load_state_dict(sd)
                print("✅ Loaded checkpoint into model.model (backbone).")
            except:
                model.load_state_dict(sd, strict=False)
                print("⚠️ Loaded checkpoint with strict=False (partial load).")
        else:
            model.load_state_dict(sd, strict=False)
            print("⚠️ Loaded checkpoint with strict=False (partial load).")

    return model

# ----------------- IMAGE TRANSFORMS -----------------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485,0.456,0.406], [0.229,0.224,0.225])
])

# ----------------- PREDICTION -----------------
def predict_image(image_path, model, classes, device="cpu", topk=3):
    img = Image.open(image_path).convert("RGB")
    x = transform(img).unsqueeze(0).to(device)
    model.to(device)
    model.eval()
    with torch.no_grad():
        out = model(x)
        probs = F.softmax(out, dim=1)
        topv, topi = torch.topk(probs, k=topk, dim=1)
    
    results = []
    for i in range(topk):
        idx = topi[0, i].item()
        conf = topv[0, i].item() * 100.0
        label = classes[idx] if isinstance(classes, list) else classes[str(idx)]
        results.append((label, conf))
    return results

# ----------------- MAIN -----------------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("image", help="path to image")
    ap.add_argument("--model", default="food_classifier.pth")
    ap.add_argument("--classes", default="classes.json")
    ap.add_argument("--device", default="cpu", choices=["cpu","cuda"])
    ap.add_argument("--topk", type=int, default=3)
    args = ap.parse_args()

    classes = load_classes(args.classes)
    model = build_model(num_classes=len(classes), ckpt_path=args.model)
    device = torch.device("cuda" if (args.device=="cuda" and torch.cuda.is_available()) else "cpu")

    results = predict_image(args.image, model, classes, device=device, topk=args.topk)
    for label, conf in results:
        print(f"{label} ({conf:.2f}% confidence)")

if __name__ == "__main__":
    main()

