import Box from '@mui/material/Box';
// import Snackbar from '@mui/material/Snackbar/Snackbar';
import Snackbar from '@mui/material/Snackbar';
import { memo, useState } from 'react';
const SnackbarMsg = ({open,message}: any) => {
  const [state, setState] = useState<any>({
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
    return (
     
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={1200}
        color="primary"
        
      />
      );

}

export default SnackbarMsg