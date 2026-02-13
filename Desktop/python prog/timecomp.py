import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs

# Step 1: Generate binary classification data
X, y = make_blobs(n_samples=1000, centers=2, n_features=2, cluster_std=1.0, random_state=42)
y = np.where(y == 0, -1, 1)  # Convert labels to -1 and +1

# Step 2: Add bias term (x0 = 1)
X_bias = np.hstack((np.ones((X.shape[0], 1)), X))  # Shape: (1000, 3)

# Step 3: Hebbian Training
weights = np.zeros(X_bias.shape[1])
learning_rate = 0.01

for i in range(X_bias.shape[0]):
    weights += learning_rate * X_bias[i] * y[i]

# Step 4: Plotting
plt.figure(figsize=(8, 6))
plt.scatter(X[y == -1, 0], X[y == -1, 1], color='blue', label='Class -1', alpha=0.6)
plt.scatter(X[y == 1, 0], X[y == 1, 1], color='darkred', label='Class +1', alpha=0.6)

# Step 5: Decision Boundary: w0 + w1*x + w2*y = 0 => y = -(w0 + w1*x) / w2
x_vals = np.array(plt.gca().get_xlim())
if weights[2] != 0:
    y_vals = -(weights[0] + weights[1] * x_vals) / weights[2]
    plt.plot(x_vals, y_vals, 'k--', label='Decision Boundary')

# Step 6: Styling
plt.xlabel("X1")
plt.ylabel("X2")
plt.title("Hebbian Learning - Decision Boundary Update")
plt.legend()
plt.grid(True)
plt.show()
