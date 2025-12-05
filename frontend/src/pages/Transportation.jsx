import React, { useState } from 'react';
import axios from 'axios';

const Transportation = () => {
    const [numSources, setNumSources] = useState(3);
    const [numDestinations, setNumDestinations] = useState(3);
    const [costs, setCosts] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    const [supply, setSupply] = useState([0, 0, 0]);
    const [demand, setDemand] = useState([0, 0, 0]);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSizeChange = (sources, destinations) => {
        setNumSources(sources);
        setNumDestinations(destinations);

        setCosts(prev => {
            const newMatrix = new Array(sources).fill(0).map(() => new Array(destinations).fill(0));
            prev.forEach((row, i) => {
                if (i < sources) {
                    row.forEach((v, j) => {
                        if (j < destinations) newMatrix[i][j] = v;
                    });
                }
            });
            return newMatrix;
        });

        setSupply(prev => {
            const newSupply = new Array(sources).fill(0);
            prev.forEach((v, i) => { if (i < sources) newSupply[i] = v; });
            return newSupply;
        });

        setDemand(prev => {
            const newDemand = new Array(destinations).fill(0);
            prev.forEach((v, i) => { if (i < destinations) newDemand[i] = v; });
            return newDemand;
        });
    };

    const handleCostChange = (row, col, value) => {
        const newCosts = [...costs];
        newCosts[row][col] = parseFloat(value) || 0;
        setCosts(newCosts);
    };

    const handleSupplyChange = (index, value) => {
        const newSupply = [...supply];
        newSupply[index] = parseFloat(value) || 0;
        setSupply(newSupply);
    };

    const handleDemandChange = (index, value) => {
        const newDemand = [...demand];
        newDemand[index] = parseFloat(value) || 0;
        setDemand(newDemand);
    };

    const generateScenario = () => {
        const s = Math.floor(Math.random() * 4) + 6; // 6-9 sources (Major Hubs: KHI, LHE, ISB, etc.)
        const d = Math.floor(Math.random() * 6) + 10; // 10-15 destinations (International)

        setNumSources(s);
        setNumDestinations(d);

        // Random costs (Shipping cost per unit)
        const newCosts = Array.from({ length: s }, () =>
            Array.from({ length: d }, () => Math.floor(Math.random() * 500) + 50)
        );
        setCosts(newCosts);

        // Balanced supply/demand
        const total = 5000; // Total Cargo Units
        // Distribute supply randomly
        let currentSupply = 0;
        const newSupply = [];
        for (let i = 0; i < s - 1; i++) {
            const val = Math.floor((total - currentSupply) / (s - i) * (0.8 + Math.random() * 0.4));
            newSupply.push(val);
            currentSupply += val;
        }
        newSupply.push(total - currentSupply);
        setSupply(newSupply);

        // Distribute demand randomly
        let currentDemand = 0;
        const newDemand = [];
        for (let i = 0; i < d - 1; i++) {
            const val = Math.floor((total - currentDemand) / (d - i) * (0.8 + Math.random() * 0.4));
            newDemand.push(val);
            currentDemand += val;
        }
        newDemand.push(total - currentDemand);
        setDemand(newDemand);

        setResult(null);
    };

    const solve = async () => {
        setError(null);
        setResult(null);
        try {
            const payload = {
                supply,
                demand,
                costs
            };
            const res = await axios.post('http://localhost:8000/solve/transportation', payload);
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
        }
    };

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Transportation Problem</h1>
                <button onClick={generateScenario} style={{ background: '#FFD700', color: 'black' }}>Generate Data</button>
            </div>

            <div className="input-group">
                <label>Sources: </label>
                <input
                    type="number"
                    value={numSources}
                    onChange={(e) => handleSizeChange(parseInt(e.target.value) || 1, numDestinations)}
                    min="1"
                />
                <label>Destinations: </label>
                <input
                    type="number"
                    value={numDestinations}
                    onChange={(e) => handleSizeChange(numSources, parseInt(e.target.value) || 1)}
                    min="1"
                />
            </div>

            <h3>Cost Matrix & Supply/Demand</h3>
            <div style={{ overflowX: 'auto' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Source \ Dest</th>
                            {Array.from({ length: numDestinations }).map((_, j) => (
                                <th key={j}>D{j + 1}</th>
                            ))}
                            <th>Supply</th>
                        </tr>
                    </thead>
                    <tbody>
                        {costs.map((row, i) => (
                            <tr key={i}>
                                <th>S{i + 1}</th>
                                {row.map((val, j) => (
                                    <td key={j}>
                                        <input
                                            type="number"
                                            value={val}
                                            onChange={(e) => handleCostChange(i, j, e.target.value)}
                                            style={{ width: '60px' }}
                                        />
                                    </td>
                                ))}
                                <td>
                                    <input
                                        type="number"
                                        value={supply[i]}
                                        onChange={(e) => handleSupplyChange(i, e.target.value)}
                                        style={{ width: '60px', borderColor: '#00A859' }}
                                    />
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <th>Demand</th>
                            {demand.map((val, j) => (
                                <td key={j}>
                                    <input
                                        type="number"
                                        value={val}
                                        onChange={(e) => handleDemandChange(j, e.target.value)}
                                        style={{ width: '60px', borderColor: '#00A859' }}
                                    />
                                </td>
                            ))}
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button onClick={solve} style={{ marginTop: '20px' }}>Solve Transportation</button>

            {error && <div style={{ color: 'red', marginTop: '20px' }}>Error: {error}</div>}

            {result && (
                <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                    <h3>Optimization Results</h3>
                    <p>Status: <span style={{ color: result.success ? '#00A859' : 'red', fontWeight: 'bold' }}>{result.message}</span></p>

                    <div style={{ margin: '20px 0', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                        <p style={{ fontSize: '1.1em' }}>
                            The <strong>minimum shipping cost</strong> to satisfy all demands is:
                            <span style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '1.3em', marginLeft: '10px' }}>
                                {result.total_cost?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </p>
                    </div>

                    {result.success && (
                        <>
                            <h4>Recommended Shipment Plan:</h4>
                            <p style={{ fontSize: '0.9em', color: '#ccc', marginBottom: '10px' }}>
                                The table below shows exactly how many units should be sent from each Source (S) to each Destination (D).
                                <br />Green cells indicate active shipments.
                            </p>
                            <div style={{ overflowX: 'auto' }}>
                                <table>
                                    <tbody>
                                        {result.transport_matrix.map((row, i) => (
                                            <tr key={i}>
                                                {row.map((val, j) => (
                                                    <td key={j} style={{
                                                        backgroundColor: val > 0 ? 'rgba(0, 168, 89, 0.5)' : 'transparent',
                                                        color: val > 0 ? 'white' : '#666',
                                                        fontWeight: val > 0 ? 'bold' : 'normal',
                                                        border: val > 0 ? '1px solid #00A859' : '1px solid rgba(255,255,255,0.1)'
                                                    }}>
                                                        {val > 0 ? val.toFixed(1) : '-'}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Transportation;
