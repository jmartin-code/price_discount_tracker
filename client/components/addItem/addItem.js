import React, { useState } from 'react'

////////// UI //////////////
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog } from '@mui/material'
import { Box } from '@mui/system'

//////////// COMPONENT /////////////
import Form from './From'
import Message from '../snackbar/Message';

function addItem() {
    const [openForm, setopenForm] = useState(false)

    const handleOpenForm = () => {
        setopenForm(true)
    }

    const handleCloseForm = () => {
        setopenForm(false)
    }

    const [openAlert, setopenAlert] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('')
    const [alertSeverity, setalertSeverity] = useState('')

    const handleAlert = (message, severity = '') => {
        console.log('alert open')
        setopenAlert(true)
        setAlertMessage(message)
        setalertSeverity(severity)
    }

    const handleCloseAlert = () => {
        console.log('alert close')
        setopenAlert(false)
        setAlertMessage('')
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleOpenForm} variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: 5 }}>
                    Add New Item To Track
                </Button>
            </Box>
            <Message openAlert={openAlert} message={AlertMessage} severity={alertSeverity} handleCloseAlert={handleCloseAlert} />
            <Dialog open={openForm} onClose={handleCloseForm}>
                <Form title={'ADD NEW ITEM'} handleAlert={handleAlert} handleCloseForm={handleCloseForm} />
            </Dialog>
        </>
    )
}

export default addItem
