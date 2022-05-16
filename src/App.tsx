import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Router } from './Routes';

function App() {

    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;
