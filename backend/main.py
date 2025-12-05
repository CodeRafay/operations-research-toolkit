from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from solvers import simplex, assignment, transportation

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Operations Research Solver API"}

@app.post("/solve/simplex", response_model=simplex.SimplexResult)
def solve_simplex_endpoint(data: simplex.SimplexInput):
    try:
        result = simplex.solve_simplex(data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/solve/assignment", response_model=assignment.AssignmentResult)
def solve_assignment_endpoint(data: assignment.AssignmentInput):
    try:
        result = assignment.solve_assignment(data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/solve/transportation", response_model=transportation.TransportationResult)
def solve_transportation_endpoint(data: transportation.TransportationInput):
    try:
        result = transportation.solve_transportation(data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
