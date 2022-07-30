import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';

const Shop = () => {
    return (
        <div>
            <div>
                <h1>This is Shop</h1>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />}></Route>
                <Route path="shop" element={<Shop />}></Route>
                <Route path="signin" element={<SignIn />}></Route>
            </Route>
        </Routes>
    );
};

export default App;
