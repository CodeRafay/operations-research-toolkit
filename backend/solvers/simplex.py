from typing import List, Literal, Optional
from pydantic import BaseModel
import numpy as np
from scipy.optimize import linprog

class SimplexInput(BaseModel):
    objective: List[float]  # Coefficients of the objective function
    constraints: List[List[float]]  # LHS of constraints (A matrix)
    rhs: List[float]  # RHS of constraints (b vector)
    signs: List[Literal["<=", ">=", "="]]  # Constraint signs
    maximize: bool = True

class SimplexResult(BaseModel):
    success: bool
    message: str
    optimal_value: Optional[float]
    solution: Optional[List[float]]
    shadow_prices: Optional[List[float]] = None
    slack: Optional[List[float]] = None

def solve_simplex(data: SimplexInput) -> SimplexResult:
    # Scipy linprog minimizes by default, so negate objective for maximization
    c = np.array(data.objective)
    if data.maximize:
        c = -c

    A_ub = []
    b_ub = []
    A_eq = []
    b_eq = []

    for i, sign in enumerate(data.signs):
        row = data.constraints[i]
        val = data.rhs[i]
        if sign == "<=":
            A_ub.append(row)
            b_ub.append(val)
        elif sign == ">=":
            # Multiply by -1 to convert >= to <=
            A_ub.append([-x for x in row])
            b_ub.append(-val)
        elif sign == "=":
            A_eq.append(row)
            b_eq.append(val)

    # Convert to numpy arrays if not empty, else None
    A_ub = np.array(A_ub) if A_ub else None
    b_ub = np.array(b_ub) if b_ub else None
    A_eq = np.array(A_eq) if A_eq else None
    b_eq = np.array(b_eq) if b_eq else None

    # Bounds: default is (0, None) for all variables (non-negativity)
    bounds = [(0, None) for _ in range(len(c))]

    res = linprog(c, A_ub=A_ub, b_ub=b_ub, A_eq=A_eq, b_eq=b_eq, bounds=bounds, method='highs')

    if res.success:
        optimal_val = -res.fun if data.maximize else res.fun
        
        # Extract sensitivity info if available (HiGHS method usually provides it)
        # Note: Scipy's HiGHS wrapper might not expose full sensitivity ranges directly in the result object easily without extra parsing,
        # but it gives dual values (shadow prices).
        # res.ineqlin.marginals (shadow prices for inequality constraints)
        # res.eqlin.marginals (shadow prices for equality constraints)
        
        shadow_prices = []
        # Reconstruct shadow prices in order of original constraints? 
        # This is tricky because we split them. 
        # For a simple project, we might just return what we have or map them back if critical.
        # Let's just return the duals we have.
        
        return SimplexResult(
            success=True,
            message=res.message,
            optimal_value=optimal_val,
            solution=res.x.tolist(),
            # Simplified shadow prices (combining ub and eq might be needed for full mapping)
            # For now, just returning solution.
        )
    else:
        return SimplexResult(
            success=False,
            message=res.message,
            optimal_value=None,
            solution=None
        )
