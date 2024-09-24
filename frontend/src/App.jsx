// frontend/src/app.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/login';
import Home from './home/home';
import Index from './index';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Index />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
