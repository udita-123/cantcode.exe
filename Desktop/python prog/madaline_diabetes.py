import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# -----------------------------
# Load dataset directly from URL
# -----------------------------
url = "https://raw.githubusercontent.com/jbrownlee/Datasets/master/pima-indians-diabetes.data.csv"
cols = ["Pregnancies", "Glucose", "BloodPressure", "SkinThickness",
        "Insulin", "BMI", "DiabetesPedigreeFunction", "Age", "Outcome"]

df = pd.read_csv(url, names=cols)

# Features & target
X = df.iloc[:, :-1].values
y = df.iloc[:, -1].values

# Convert labels {0,1} -> {-1,1}
y = np.where(y == 0, -1, 1)

# Normalize features
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# -----------------------------
# MADALINE Class
# -----------------------------
class MADALINE:
    def __init__(self, input_dim, hidden_dim, lr=0.01, epochs=100):
        self.lr = lr
        self.epochs = epochs
        self.hidden_dim = hidden_dim
        self.W_hidden = np.random.randn(hidden_dim, input_dim) * 0.01
        self.b_hidden = np.zeros((hidden_dim, 1))
        self.W_output = np.random.randn(1, hidden_dim) * 0.01
        self.b_output = np.zeros((1, 1))
    
    def activation(self, x):
        return np.where(x >= 0, 1, -1)
    
    def fit(self, X, y):
        for _ in range(self.epochs):
            for xi, target in zip(X, y):
                xi_col = xi.reshape(-1, 1)  # (8, 1) for forward pass
                target = np.array([[target]])
                
                # Forward pass
                hidden_input = np.dot(self.W_hidden, xi_col) + self.b_hidden
                hidden_output = self.activation(hidden_input)
                
                final_input = np.dot(self.W_output, hidden_output) + self.b_output
                final_output = self.activation(final_input)
                
                # If misclassified
                if final_output != target:
                    for j in range(self.hidden_dim):
                        temp_hidden = hidden_output.copy()
                        temp_hidden[j, 0] *= -1
                        temp_final_input = np.dot(self.W_output, temp_hidden) + self.b_output
                        temp_final_output = self.activation(temp_final_input)
                        
                        if temp_final_output == target:
                            # Reshape to (1, input_dim) to match weight row
                            xi_row = xi.reshape(1, -1)
                            self.W_hidden[j:j+1, :] += self.lr * (target - hidden_output[j, 0]) * xi_row
                            self.b_hidden[j, 0] += self.lr * (target - hidden_output[j, 0])
    
    def predict(self, X):
        outputs = []
        for xi in X:
            xi = xi.reshape(-1, 1)
            hidden_input = np.dot(self.W_hidden, xi) + self.b_hidden
            hidden_output = self.activation(hidden_input)
            final_input = np.dot(self.W_output, hidden_output) + self.b_output
            final_output = self.activation(final_input)
            outputs.append(final_output.item())
        return np.array(outputs)

# -----------------------------
# Train & Evaluate
# -----------------------------
model = MADALINE(input_dim=X.shape[1], hidden_dim=10, lr=0.01, epochs=50)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Convert predictions back { -1, 1 } → { 0, 1 }
y_pred_binary = np.where(y_pred == -1, 0, 1)
y_test_binary = np.where(y_test == -1, 0, 1)

print("Accuracy:", accuracy_score(y_test_binary, y_pred_binary))
