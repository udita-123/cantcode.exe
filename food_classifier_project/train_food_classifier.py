#!/usr/bin/env python3
# train_food_classifier.py

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, transforms, models
from model_def import FoodClassifier  # your model file
import json
from pathlib import Path

# ----------------- SETTINGS -----------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

data_dir = Path("data")
num_epochs = 50  # train longer to increase confidence
batch_size = 16
learning_rate = 1e-3

# ----------------- DATA TRANSFORMS -----------------
train_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(15),
    transforms.ToTensor(),
    transforms.Normalize([0.485,0.456,0.406], [0.229,0.224,0.225])
])

val_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485,0.456,0.406], [0.229,0.224,0.225])
])

# ----------------- DATASET -----------------
train_dataset = datasets.ImageFolder(data_dir / "train", transform=train_transform)
val_dataset = datasets.ImageFolder(data_dir / "val", transform=val_transform)

train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)

classes = train_dataset.classes
print("Classes:", classes)

# save classes.json if not already
with open("classes.json", "w") as f:
    json.dump(classes, f)

# ----------------- MODEL -----------------
model = FoodClassifier(num_classes=len(classes))

# ensure classifier head is trainable
for name, param in model.named_parameters():
    if "fc" in name or "classifier" in name:
        param.requires_grad = True
    else:
        param.requires_grad = False

# ----------------- CHECK TRAINABLE PARAMS -----------------
trainable_count = 0
print("Trainable parameters:")
for name, param in model.named_parameters():
    print(f"{name}: requires_grad={param.requires_grad}")
    if param.requires_grad:
        trainable_count += param.numel()
print(f"Total trainable parameters: {trainable_count}")
if trainable_count == 0:
    raise RuntimeError("No trainable parameters! Make sure classifier layers are set requires_grad=True")

model = model.to(device)

# ----------------- OPTIMIZER & LOSS -----------------
optimizer = optim.Adam(filter(lambda p: p.requires_grad, model.parameters()), lr=learning_rate)
criterion = nn.CrossEntropyLoss()

# ----------------- TRAINING LOOP -----------------
for epoch in range(num_epochs):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0

    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item() * images.size(0)
        _, predicted = outputs.max(1)
        total += labels.size(0)
        correct += predicted.eq(labels).sum().item()

    train_loss = running_loss / len(train_dataset)
    train_acc = correct / total * 100

    # validation
    model.eval()
    val_loss = 0.0
    val_correct = 0
    val_total = 0
    with torch.no_grad():
        for images, labels in val_loader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            loss = criterion(outputs, labels)
            val_loss += loss.item() * images.size(0)
            _, predicted = outputs.max(1)
            val_total += labels.size(0)
            val_correct += predicted.eq(labels).sum().item()

    val_loss /= len(val_dataset)
    val_acc = val_correct / val_total * 100

    print(f"Epoch [{epoch+1}/{num_epochs}] "
          f"Train Loss: {train_loss:.4f}, Train Acc: {train_acc:.2f}% "
          f"Val Loss: {val_loss:.4f}, Val Acc: {val_acc:.2f}%")

# ----------------- SAVE MODEL -----------------
torch.save(model.state_dict(), "food_classifier.pth")
print("Training done! Model saved as food_classifier.pth")

