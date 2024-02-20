import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Home</NavLink>
            <NavLink to="/chat" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Chat</NavLink>
            <NavLink to="/game" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Game</NavLink>
        </div>
    );
};

export default Navbar;