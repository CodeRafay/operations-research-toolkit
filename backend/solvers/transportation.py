from typing import List, Optional
from pydantic import BaseModel
import numpy as np
from scipy.optimize import linprog

class TransportationInput(BaseModel):
    supply: List[float]
    demand: List[float]
    costs: List[List[float]]

class TransportationResult(BaseModel):
    transport_matrix: List[List[float]]
    total_cost: float
    success: bool
    message: str

def solve_transportation(data: TransportationInput) -> TransportationResult:
    supply = np.array(data.supply)
    demand = np.array(data.demand)
    costs = np.array(data.costs)
    
    num_supply = len(supply)
    num_demand = len(demand)
    
    # Flatten costs for objective function
    c = costs.flatten()
    
    # Equality constraints
    # Supply constraints: sum(x_ij) over j = S_i
    A_eq = []
    b_eq = []
    
    for i in range(num_supply):
        row = np.zeros(num_supply * num_demand)
        # x_i0, x_i1, ..., x_i(m-1) corresponds to indices i*m + j
        row[i*num_demand : (i+1)*num_demand] = 1
        A_eq.append(row)
        b_eq.append(supply[i])
        
    # Demand constraints: sum(x_ij) over i = D_j
    for j in range(num_demand):
        row = np.zeros(num_supply * num_demand)
        # x_0j, x_1j, ..., x_(n-1)j corresponds to indices k*m + j
        for k in range(num_supply):
            row[k*num_demand + j] = 1
        A_eq.append(row)
        b_eq.append(demand[j])
        
    A_eq = np.array(A_eq)
    b_eq = np.array(b_eq)
    
    # Bounds: x_ij >= 0
    bounds = [(0, None) for _ in range(len(c))]
    
    res = linprog(c, A_eq=A_eq, b_eq=b_eq, bounds=bounds, method='highs')
    
    if res.success:
        transport_matrix = res.x.reshape(num_supply, num_demand).tolist()
        return TransportationResult(
            transport_matrix=transport_matrix,
            total_cost=res.fun,
            success=True,
            message=res.message
        )
    else:
        return TransportationResult(
            transport_matrix=[],
            total_cost=0.0,
            success=False,
            message=res.message
        )
