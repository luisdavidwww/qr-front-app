import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

//estilos Diseño
import "./Loader.css"

const Loader = () => {
  return (
    <>
            <div className='loanding__Container'>
              <Box sx={{ display: 'flex' }} className='loading' >
                <CircularProgress color="success" />
              </Box>
            </div>
    </>
  )
}

export default Loader