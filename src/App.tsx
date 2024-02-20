import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatWithModel from './pages/ChatWithModel';
import GameWorld from './pages/Game';
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Sidebar />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chat" element={<ChatWithModel />} />
                    <Route path="/game" element={<GameWorld />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
