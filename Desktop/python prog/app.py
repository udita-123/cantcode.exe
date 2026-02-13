import random

# --- Problem Definition ---
# Knapsack capacity
CAPACITY = 50

# Example items: (value, weight)
ITEMS = [
    (60, 10),
    (100, 20),
    (120, 30),
    (90, 15),
    (30, 5),
    (50, 10),
    (70, 12)
]

N_ITEMS = len(ITEMS)

# --- Genetic Algorithm Parameters ---
POP_SIZE = 50
MAX_GEN = 100
MUTATION_RATE = 0.1
TOURNAMENT_SIZE = 3

# --- Helper Functions ---
def fitness(individual):
    """Calculate fitness of an individual."""
    total_value = 0
    total_weight = 0
    for i in range(N_ITEMS):
        if individual[i] == 1:
            total_value += ITEMS[i][0]
            total_weight += ITEMS[i][1]
    if total_weight > CAPACITY:
        return 0  # invalid solution
    return total_value


def create_individual():
    return [random.randint(0, 1) for _ in range(N_ITEMS)]


def selection(population):
    """Tournament selection."""
    tournament = random.sample(population, TOURNAMENT_SIZE)
    tournament.sort(key=lambda ind: fitness(ind), reverse=True)
    return tournament[0]


def crossover(parent1, parent2):
    """Single point crossover."""
    point = random.randint(1, N_ITEMS - 1)
    child1 = parent1[:point] + parent2[point:]
    child2 = parent2[:point] + parent1[point:]
    return child1, child2


def mutate(individual):
    for i in range(N_ITEMS):
        if random.random() < MUTATION_RATE:
            individual[i] = 1 - individual[i]
    return individual

# --- Main GA Loop ---
def genetic_algorithm():
    population = [create_individual() for _ in range(POP_SIZE)]

    for generation in range(MAX_GEN):
        new_population = []

        while len(new_population) < POP_SIZE:
            parent1 = selection(population)
            parent2 = selection(population)
            child1, child2 = crossover(parent1, parent2)
            new_population.append(mutate(child1))
            if len(new_population) < POP_SIZE:
                new_population.append(mutate(child2))

        population = new_population

        # Print best fitness per generation
        best = max(population, key=lambda ind: fitness(ind))
        print(f"Generation {generation+1}: Best Fitness = {fitness(best)}")

    best_solution = max(population, key=lambda ind: fitness(ind))
    return best_solution, fitness(best_solution)


# Run GA
solution, value = genetic_algorithm()
print("Best Solution:", solution)
print("Best Value:", value)