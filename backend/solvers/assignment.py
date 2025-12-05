from typing import List, Optional
from pydantic import BaseModel
import numpy as np
from scipy.optimize import linear_sum_assignment

class AssignmentInput(BaseModel):
    cost_matrix: List[List[float]]

class AssignmentResult(BaseModel):
    assignments: List[List[int]]  # List of [row, col] pairs
    total_cost: float

def solve_assignment(data: AssignmentInput) -> AssignmentResult:
    cost_matrix = np.array(data.cost_matrix)
    row_ind, col_ind = linear_sum_assignment(cost_matrix)
    
    total_cost = cost_matrix[row_ind, col_ind].sum()
    assignments = list(zip(row_ind.tolist(), col_ind.tolist()))
    
    return AssignmentResult(
        assignments=assignments,
        total_cost=float(total_cost)
    )
