import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Home from './Home';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Login() {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    if (isAuthenticated) {
        return <Home />
    }
    return (
        <div>
            {
                isLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <CircularProgress />
                </Box> : loginWithRedirect()
            }
        </div>
    )
}

export default Login