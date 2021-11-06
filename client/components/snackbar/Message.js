import React from 'react'
import { Alert, Snackbar } from '@mui/material';

function Message({ message, severity, openAlert, handleCloseAlert }) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        handleCloseAlert()
    };

    const vertical = 'top'
    const horizontal = 'right'

    return (
        <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} sx={{ mt: 14 }}>
            <Alert onClose={handleClose} severity={severity || "success"} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Message
