import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export default function TransitionAlerts({ErrorMessage, Tipo }) {

  React.useEffect(() => {
    if( ErrorMessage && ErrorMessage.length > 0 ){
      setOpen(true);
    }
    else{
      setOpen(false);
    }
    console.log("aaaaaaaaaaa"+ErrorMessage)
  }, [ErrorMessage]);

  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        
        <Alert severity={Tipo === "exito" ? "success" : "error"} variant="filled"
          action={
            <IconButton
              aria-label="close"
              color={"inherit"}
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize={Tipo === "exito" ? "medium": "medium"} />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {ErrorMessage}
        </Alert>
      </Collapse>
    </Box>
  );
}
