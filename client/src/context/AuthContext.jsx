import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            return data;
        } catch (error) {
            throw error.response?.data?.message || 'Login failed';
        }
    };

    const register = async (name, email, password, role, apartmentNumber) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role, apartmentNumber });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            return data;
        } catch (error) {
            throw error.response?.data?.message || 'Registration failed';
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    };

    useEffect(() => {
        if (user) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
