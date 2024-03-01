import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LazyLoading() {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <CircularProgress color="secondary"  />
        </div>
    );
}
