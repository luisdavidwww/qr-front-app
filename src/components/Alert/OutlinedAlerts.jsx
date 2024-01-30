import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function OutlinedAlerts( { ErrorMessage }) {

    useEffect(() => {
          console.log("aqui del otro lado"+ErrorMessage);
      }, []);

  return (
    <Stack sx={{ width: '380px', display:"flex" }} spacing={10}>
      <Alert variant="filled" severity="error" style={{fontSize:"13px"}}>
        {ErrorMessage}
      </Alert>
    </Stack>
  );
}