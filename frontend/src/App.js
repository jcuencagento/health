import React, { useState } from 'react';
import LandingPage from './components/LandingPage';

function App() {
    const [user, setUser] = useState(null);

    if (!user) {
        return <LandingPage onLoginSuccess={setUser} />;
    }

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Bienvenido, {user.username}</h1>
            {/* Aquí vendrán las 3 secciones de info única */}
        </div>
    );
}

export default App;
