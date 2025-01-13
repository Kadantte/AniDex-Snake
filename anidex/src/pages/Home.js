import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>AniDex</h1>
            <p>Identify snake species based on image or description.</p>
            <Link to="/identify-image">Identify by Image Upload</Link>
            <br />
            <Link to="/identify-camera">Identify by Camera</Link>
            <br />
            <Link to="/describe">Describe the Snake</Link>
        </div>
    );
}

export default Home;
