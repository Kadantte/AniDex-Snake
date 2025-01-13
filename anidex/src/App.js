import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import IdentifyImage from './pages/IdentifyImage';
import DescribeSnake from './pages/DescribeSnake';
import Results from './pages/Results';
import IdentifyByCamera from './pages/IdentifyByCamera';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/identify-image" element={<IdentifyImage />} />
                <Route path="/describe" element={<DescribeSnake />} />
                <Route path="/results" element={<Results />} />
                <Route path="/identify-camera" element={<IdentifyByCamera />} />
            </Routes>
        </Router>
    );
}

export default App;
