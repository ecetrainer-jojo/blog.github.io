import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Home</NavLink>
            <NavLink to="/chat" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Chat</NavLink>
            <NavLink to="/game" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Game</NavLink>
        </div>
    );
};

export default Sidebar;