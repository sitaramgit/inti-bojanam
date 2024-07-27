import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { memo, useState } from "react";
interface ISnackbarMsg {
  alertType: "success" | "info" | "warning" | "error";
  open: boolean;
  message: string;
}
const SnackbarMsg = ({ open, message, alertType }: ISnackbarMsg) => {
  const [state, setState] = useState<any>({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
    open = false;
  };
  return (
    <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={1000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={alertType}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarMsg;
