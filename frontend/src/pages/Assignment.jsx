import React, { useState } from 'react';
import axios from 'axios';

const Assignment = () => {
  const [size, setSize] = useState(3);
  const [costMatrix, setCostMatrix] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSizeChange = (e) => {
    const val = parseInt(e.target.value) || 1;
    setSize(val);
    setCostMatrix(prev => {
      const newMatrix = new Array(val).fill(0).map(() => new Array(val).fill(0));
      prev.forEach((row, i) => {
        if (i < val) {
          row.forEach((v, j) => {
            if (j < val) newMatrix[i][j] = v;
          });
        }
      });
      return newMatrix;
    });
  };

  const handleCostChange = (row, col, value) => {
    const newMatrix = [...costMatrix];
    newMatrix[row][col] = parseFloat(value) || 0;
    setCostMatrix(newMatrix);
  };

  const generateScenario = () => {
    const newSize = Math.floor(Math.random() * 6) + 10; // 10 to 15
    setSize(newSize);

    // PIA Context: Rows = Pilots/Crew, Cols = Flights
    // Cost = Distance/Fatigue/Overtime
    const newMatrix = Array.from({ length: newSize }, () =>
      Array.from({ length: newSize }, () => Math.floor(Math.random() * 100) + 10)
    );
    setCostMatrix(newMatrix);
    setResult(null);
  };

  const solve = async () => {
    setError(null);
    setResult(null);
    try {
      const payload = { cost_matrix: costMatrix };
      const res = await axios.post('http://localhost:8000/solve/assignment', payload);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Assignment Problem</h1>
        <button onClick={generateScenario} style={{ background: '#FFD700', color: 'black' }}>Generate Data</button>
      </div>

      <div className="input-group">
        <label>Size (NxN): </label>
        <input type="number" value={size} onChange={handleSizeChange} min="1" />
      </div>

      <h3>Cost Matrix</h3>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <tbody>
            {costMatrix.map((row, i) => (
              <tr key={i}>
                {row.map((val, j) => {
                  // Highlight assigned cells
                  const isAssigned = result?.assignments.some(([r, c]) => r === i && c === j);
                  return (
                    <td key={j} style={{
                      backgroundColor: isAssigned ? 'rgba(0, 168, 89, 0.5)' : 'transparent',
                      border: isAssigned ? '2px solid #00A859' : '1px solid var(--glass-border)'
                    }}>
                      <input
                        type="number"
                        value={val}
                        onChange={(e) => handleCostChange(i, j, e.target.value)}
                        style={{ width: '60px', background: 'transparent', border: 'none', textAlign: 'center' }}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={solve} style={{ marginTop: '20px' }}>Solve Assignment</button>

      {error && <div style={{ color: 'red', marginTop: '20px' }}>Error: {error}</div>}

      {result && (
        <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
          <h3>Optimization Results</h3>
          <div style={{ margin: '20px 0', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
              The <strong>minimum total cost/time</strong> for this assignment is:
              <span style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '1.3em', marginLeft: '10px' }}>
                {result.total_cost}
              </span>
            </p>
            <p style={{ color: '#ccc' }}>
              Optimal assignments (Crew &rarr; Flight):
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginTop: '10px' }}>
              {result.assignments.map(([row, col], i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '4px', borderLeft: '3px solid #BFA15F' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontWeight: 'bold' }}>Crew Member {row + 1}</span>
                    <span style={{ color: '#aaa' }}>&rarr;</span>
                    <span style={{ fontWeight: 'bold' }}>Flight {col + 1}</span>
                  </div>
                  <div style={{ fontSize: '0.8em', color: '#ccc' }}>Cost Impact: {costMatrix[row][col]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Assignment;

