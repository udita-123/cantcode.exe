# cantcode.exe
k-1000 ignithon
WEBSITE LINK: https://mealink.lovable.app/


MEALINK


Project Overview

This project was built for SDG 2 – Zero Hunger during a hackathon.
It is a simple yet impactful web application that connects donors (restaurants, canteens, households) with NGOs / needy communities to distribute surplus food efficiently. The app reduces food waste while ensuring food reaches those who need it most.

Features:

->Donate Food → Donors can post details of surplus food.

->View Donations → NGOs can view all available food items.

->Register NGOs → NGOs can sign up with name & location.

->Smart Matching → NGOs can find the most relevant food donations based on type & location.

->Lightweight & Hackathon-ready → Runs without a heavy database.

->Mobile Access → Can be accessed on phone via USB or Wi-Fi.

🛠 Tech Stack

Frontend (Website UI): Responsive web interface (HTML, CSS, JS) for donor & NGO interaction.

Backend (APIs): FastAPI
 – REST APIs to manage donations, NGOs, and matches.

Programming Language: Python 3

Deep Learning Framework:

PyTorch: Model loading, inference (model.eval(), torch.no_grad()), tensor operations, softmax, top-k predictions

torchvision: Image preprocessing (Resize, ToTensor, Normalize)

Image Processing: PIL (Pillow) – Open and convert images (Image.open().convert("RGB"))

Utilities:

argparse: Command-line arguments

json: Load class labels (classes.json)

Project-specific: Custom FoodClassifier model (defined in model_def.py) wrapping a CNN backbone (ResNet, VGG, EfficientNet)
