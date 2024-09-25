import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import EditUserPage from './pages/EditUserPage';
import UsersPage from './pages/UsersPage';
import './styles/App.css'

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/edit-users" element={<EditUserPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/" element={<UsersPage />} />
            </Routes>
        </Router>
    );
};

export default App;
