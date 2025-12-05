import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Simplex = () => {
    const [numVars, setNumVars] = useState(2);
    const [numConstraints, setNumConstraints] = useState(2);
    const [objective, setObjective] = useState([0, 0]);
    const [constraints, setConstraints] = useState([[0, 0], [0, 0]]);
    const [rhs, setRhs] = useState([0, 0]);
    const [signs, setSigns] = useState(["<=", "<="]);
    const [maximize, setMaximize] = useState(true);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleNumVarsChange = (e) => {
        const val = parseInt(e.target.value) || 0;
        setNumVars(val);
        setObjective(new Array(val).fill(0));
        setConstraints(constraints.map(row => {
            const newRow = new Array(val).fill(0);
            row.forEach((v, i) => { if (i < val) newRow[i] = v; });
            return newRow;
        }));
    };

    const handleNumConstraintsChange = (e) => {
        const val = parseInt(e.target.value) || 0;
        setNumConstraints(val);
        setConstraints(prev => {
            const newConstraints = new Array(val).fill(0).map(() => new Array(numVars).fill(0));
            prev.forEach((row, i) => { if (i < val) newConstraints[i] = row; });
            return newConstraints;
        });
        setRhs(prev => {
            const newRhs = new Array(val).fill(0);
            prev.forEach((v, i) => { if (i < val) newRhs[i] = v; });
            return newRhs;
        });
        setSigns(prev => {
            const newSigns = new Array(val).fill("<=");
            prev.forEach((v, i) => { if (i < val) newSigns[i] = v; });
            return newSigns;
        });
    };

    const handleObjectiveChange = (index, value) => {
        const newObj = [...objective];
        newObj[index] = parseFloat(value) || 0;
        setObjective(newObj);
    };

    const handleConstraintChange = (row, col, value) => {
        const newConstraints = [...constraints];
        newConstraints[row][col] = parseFloat(value) || 0;
        setConstraints(newConstraints);
    };

    const handleRhsChange = (index, value) => {
        const newRhs = [...rhs];
        newRhs[index] = parseFloat(value) || 0;
        setRhs(newRhs);
    };

    const handleSignChange = (index, value) => {
        const newSigns = [...signs];
        newSigns[index] = value;
        setSigns(newSigns);
    };

    const generateScenario = () => {
        const vars = Math.floor(Math.random() * 6) + 10; // 10 to 15 vars
        const cons = Math.floor(Math.random() * 6) + 10; // 10 to 15 constraints

        setNumVars(vars);
        setNumConstraints(cons);

        // PIA Context: Variables could be "Boeing 777 flights", "A320 flights", "Fuel Type A", etc.
        // For Simplex, we just set coefficients, but conceptually:
        // Maximize Profit = c1*x1 + c2*x2 ...

        // Random objective coefficients (Profit per flight/unit)
        const newObj = Array.from({ length: vars }, () => Math.floor(Math.random() * 5000) + 1000);
        setObjective(newObj);

        // Random constraints (Fuel, Crew hours, Maintenance slots)
        const newConstraints = Array.from({ length: cons }, () =>
            Array.from({ length: vars }, () => Math.floor(Math.random() * 50) + 1)
        );
        setConstraints(newConstraints);

        // Random RHS (Available resources)
        const newRhs = Array.from({ length: cons }, () => Math.floor(Math.random() * 1000) + 200);
        setRhs(newRhs);

        setSigns(new Array(cons).fill("<="));
        setMaximize(true);
        setResult(null);
    };

    const solve = async () => {
        setError(null);
        setResult(null);
        try {
            const payload = {
                objective,
                constraints,
                rhs,
                signs,
                maximize
            };
            const res = await axios.post('http://localhost:8000/solve/simplex', payload);
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
        }
    };

    // Prepare chart data
    const chartData = result?.solution?.map((val, i) => ({
        name: `X${i + 1}`,
        value: val
    })) || [];

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Simplex Solver</h1>
                <button onClick={generateScenario} style={{ background: '#FFD700', color: 'black' }}>Generate Data</button>
            </div>

            <div className="input-group">
                <label>Variables: </label>
                <input type="number" value={numVars} onChange={handleNumVarsChange} min="1" />
                <label>Constraints: </label>
                <input type="number" value={numConstraints} onChange={handleNumConstraintsChange} min="1" />
                <label>Goal: </label>
                <select value={maximize} onChange={(e) => setMaximize(e.target.value === 'true')}>
                    <option value="true">Maximize</option>
                    <option value="false">Minimize</option>
                </select>
            </div>

            <h3>Objective Function</h3>
            <div className="input-group">
                {objective.map((val, i) => (
                    <span key={i}>
                        <input
                            type="number"
                            value={val}
                            onChange={(e) => handleObjectiveChange(i, e.target.value)}
                            style={{ width: '60px' }}
                        />
                        X{i + 1} {i < numVars - 1 ? '+ ' : ''}
                    </span>
                ))}
            </div>

            <h3>Constraints</h3>
            {constraints.map((row, i) => (
                <div key={i} className="input-group">
                    {row.map((val, j) => (
                        <span key={j}>
                            <input
                                type="number"
                                value={val}
                                onChange={(e) => handleConstraintChange(i, j, e.target.value)}
                                style={{ width: '60px' }}
                            />
                            X{j + 1} {j < numVars - 1 ? '+ ' : ''}
                        </span>
                    ))}
                    <select value={signs[i]} onChange={(e) => handleSignChange(i, e.target.value)}>
                        <option value="<=">&le;</option>
                        <option value=">=">&ge;</option>
                        <option value="=">=</option>
                    </select>
                    <input
                        type="number"
                        value={rhs[i]}
                        onChange={(e) => handleRhsChange(i, e.target.value)}
                        style={{ width: '60px' }}
                    />
                </div>
            ))}

            <button onClick={solve}>Solve Optimization</button>

            {error && <div style={{ color: 'red', marginTop: '20px' }}>Error: {error}</div>}

            {result && (
                <div style={{ marginTop: '20px' }}>
                    <div style={{ padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '20px' }}>
                        <h3>Optimization Results</h3>
                        <p>Status: <span style={{ color: result.success ? '#00A859' : 'red', fontWeight: 'bold' }}>{result.message}</span></p>
                        <div style={{ margin: '20px 0', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                            <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
                                The <strong>{maximize ? 'maximum profit/efficiency' : 'minimum cost'}</strong> achievable is:
                                <span style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '1.3em', marginLeft: '10px' }}>
                                    {result.optimal_value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </p>
                            <p style={{ color: '#ccc' }}>
                                To achieve this, the recommended allocation is:
                            </p>
                            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px', listStyle: 'none', padding: 0, marginTop: '10px' }}>
                                {result.solution?.map((val, i) => (
                                    <li key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', borderLeft: '3px solid #00A859' }}>
                                        <span style={{ display: 'block', fontSize: '0.8em', color: '#aaa' }}>Variable X{i + 1}</span>
                                        <span style={{ fontWeight: 'bold' }}>{val.toFixed(2)} units</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="#ccc" />
                                <YAxis stroke="#ccc" />
                                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                                <Legend />
                                <Bar dataKey="value" fill="#00A859" name="Optimal Allocation" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Simplex;
