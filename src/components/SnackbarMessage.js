import { Snackbar, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

export const SnackBarMessage = (props) => {

    return <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={props.openSnackbar}
    autoHideDuration={props.time}
    onClose={props.handleCloseSnackbar}
    message={props.message}
    action={
      <IconButton size="small" aria-label="close" color="inherit" onClick={props.handleCloseSnackbar}>
        <Close fontSize="small" />
      </IconButton>
    }
  />
}