import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const Spinner = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: "#ab6149" }}>
            <CircularProgress color="inherit" />
        </div>
    );
};

export default Spinner;