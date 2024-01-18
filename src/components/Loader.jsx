import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-slate-300 ">
            <div className="flex items-center">
                <Box className="flex items-center">
                    <CircularProgress />
                </Box>
            </div>
        </div>
    )
}
