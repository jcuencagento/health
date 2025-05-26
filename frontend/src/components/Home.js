import React from 'react';
import Nutrition from './sections/Nutrition';
import Workouts from './sections/Workouts';
import Personal from './sections/Personal';

function Home({ user }) {
    return (
        <div>
            <h1>Bienvenido, {user.username}</h1>
            <Nutrition />
            <Workouts />
            <Personal />
        </div>
    );
}

export default Home;