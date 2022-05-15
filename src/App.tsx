import React from 'react';
import { CookiesProvider } from 'react-cookie';
import './App.css';
import { AuthContextProvider } from './contexts/AuthContext';
import { Router } from './Routes';

function App() {
    return (
        <CookiesProvider>
            <AuthContextProvider>
                <Router />
            </AuthContextProvider>
        </CookiesProvider>
    );
}

export default App;
