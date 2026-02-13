import random
import math

# --- Problem Definition ---
# Example cities with coordinates
CITIES = [
    (0, 0), (1, 5), (5, 2), (7, 8), (8, 3), (6, 6), (2, 9), (3, 3)
]

N_CITIES = len(CITIES)

# --- GA Parameters ---
POP_SIZE = 100
MAX_GEN = 200
MUTATION_RATE = 0.2
TOURNAMENT_SIZE = 5

# --- Helper Functions ---
def distance(city1, city2):
    return math.sqrt((city1[0] - city2[0])**2 + (city1[1] - city2[1])**2)


def route_length(route):
    total = 0
    for i in range(N_CITIES):
        total += distance(CITIES[route[i]], CITIES[route[(i+1) % N_CITIES]])
    return total


def fitness(route):
    return 1 / route_length(route)


def create_individual():
    route = list(range(N_CITIES))
    random.shuffle(route)
    return route


def selection(population):
    tournament = random.sample(population, TOURNAMENT_SIZE)
    tournament.sort(key=lambda ind: fitness(ind), reverse=True)
    return tournament[0]


def ordered_crossover(parent1, parent2):
    start, end = sorted(random.sample(range(N_CITIES), 2))
    child = [None] * N_CITIES
    child[start:end] = parent1[start:end]

    fill_values = [x for x in parent2 if x not in child]
    fill_index = 0
    for i in range(N_CITIES):
        if child[i] is None:
            child[i] = fill_values[fill_index]
            fill_index += 1
    return child


def mutate(individual):
    if random.random() < MUTATION_RATE:
        i, j = random.sample(range(N_CITIES), 2)
        individual[i], individual[j] = individual[j], individual[i]
    return individual

# --- Main GA Loop ---
def genetic_algorithm():
    population = [create_individual() for _ in range(POP_SIZE)]

    for generation in range(MAX_GEN):
        new_population = []
        while len(new_population) < POP_SIZE:
            parent1 = selection(population)
            parent2 = selection(population)
            child = ordered_crossover(parent1, parent2)
            new_population.append(mutate(child))

        population = new_population

        best = min(population, key=lambda ind: route_length(ind))
        print(f"Generation {generation+1}: Best Distance = {route_length(best):.2f}")

    best_solution = min(population, key=lambda ind: route_length(ind))
    return best_solution, route_length(best_solution)


# Run GA
solution, length = genetic_algorithm()
print("Best Route:", solution)
print("Route Distance:", length)