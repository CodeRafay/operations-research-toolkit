import requests
import json
import random

BASE_URL = "http://localhost:8000"

def generate_random_simplex(vars=10, cons=10):
    print(f"Testing Simplex with {vars} vars and {cons} constraints...")
    payload = {
        "objective": [random.randint(10, 100) for _ in range(vars)],
        "constraints": [[random.randint(1, 10) for _ in range(vars)] for _ in range(cons)],
        "rhs": [random.randint(50, 200) for _ in range(cons)],
        "signs": ["<=" for _ in range(cons)],
        "maximize": True
    }
    try:
        res = requests.post(f"{BASE_URL}/solve/simplex", json=payload)
        print(f"Status: {res.status_code}")
        if res.status_code == 200:
            print("Success! Optimal Value:", res.json().get("optimal_value"))
        else:
            print("Failed:", res.text)
    except Exception as e:
        print(f"Error: {e}")

def generate_random_assignment(size=10):
    print(f"\nTesting Assignment with {size}x{size} matrix...")
    payload = {
        "cost_matrix": [[random.randint(1, 100) for _ in range(size)] for _ in range(size)]
    }
    try:
        res = requests.post(f"{BASE_URL}/solve/assignment", json=payload)
        print(f"Status: {res.status_code}")
        if res.status_code == 200:
            print("Success! Total Cost:", res.json().get("total_cost"))
        else:
            print("Failed:", res.text)
    except Exception as e:
        print(f"Error: {e}")

def generate_random_transportation(sources=10, destinations=10):
    print(f"\nTesting Transportation with {sources} sources and {destinations} destinations...")
    
    # Ensure balanced supply/demand for easier feasibility
    total_supply = 1000
    supply = []
    current_s = 0
    for _ in range(sources - 1):
        val = random.randint(1, (total_supply - current_s) // 2)
        supply.append(val)
        current_s += val
    supply.append(total_supply - current_s)

    demand = []
    current_d = 0
    for _ in range(destinations - 1):
        val = random.randint(1, (total_supply - current_d) // 2)
        demand.append(val)
        current_d += val
    demand.append(total_supply - current_d)

    payload = {
        "supply": supply,
        "demand": demand,
        "costs": [[random.randint(1, 50) for _ in range(destinations)] for _ in range(sources)]
    }
    try:
        res = requests.post(f"{BASE_URL}/solve/transportation", json=payload)
        print(f"Status: {res.status_code}")
        if res.status_code == 200:
            print("Success! Total Cost:", res.json().get("total_cost"))
        else:
            print("Failed:", res.text)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    generate_random_simplex(vars=12, cons=10)
    generate_random_assignment(size=12)
    generate_random_transportation(sources=8, destinations=12)
