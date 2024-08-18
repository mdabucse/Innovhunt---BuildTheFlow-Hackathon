import React, { useState } from 'react';
import { getRecommendations } from './recommendationService';
import './App.css';

const App: React.FC = () => {
    const [productName, setProductName] = useState<string>('');
    const [recommendations, setRecommendations] = useState<string[]>([]);

    const handleRecommend = async () => {
        const result = await getRecommendations(productName);
        setRecommendations(result);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Product Recommendations</h1>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter product name"
                />
                <button onClick={handleRecommend}>Get Recommendations</button>
                <ul>
                    {recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                    ))}
                </ul>
            </header>
        </div>
    );
};

export default App;
