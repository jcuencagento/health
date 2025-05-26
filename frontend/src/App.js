import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

function App() {
    const [user, setUser] = useState(null);

    if (!user) {
        return <LandingPage onLoginSuccess={setUser} />;
    }

    return (
        <div>
            <Header />
            <Box as="main" flex="1" p={6} textAlign="center">
                <Home user={user} />
            </Box>
            <Footer />
        </div>
    );
}

export default App;
