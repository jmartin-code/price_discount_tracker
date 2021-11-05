import { CircularProgress, Container, Dialog, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

import ItemCard from './itemCard'
import Form from '../addItem/From'
import { Box } from '@mui/system'
import Message from '../snackbar/Message'


const items = ({ items }) => {
    const [openForm, setopenForm] = useState(false)
    const [itemToUpdate, setitemToUpdate] = useState({})

    const handleCloseForm = () => {
        setopenForm(false)
    }

    const handleOpenForm = (updateItem) => {
        setitemToUpdate(updateItem)
        setopenForm(true)
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
        setalertSeverity('')
    }

    if (!items) {
        return (
            <>
                <Typography align='center' variant='h5' sx={{ m: 3 }}>
                    ALL ITEMS
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50vh",
                    }}
                >
                    <CircularProgress />
                    <Typography variant="body2" color="text.secondary">
                        LOADING...
                    </Typography>
                </Box>
            </>
        )
    }

    return (
        <>
            <Typography align='center' variant='h5' sx={{ m: 3 }}>
                ALL ITEMS
            </Typography>
            <Dialog open={openForm} onClose={handleCloseForm}>
                <Form title={'UPDATE ITEM'} item={itemToUpdate} handleAlert={handleAlert} handleCloseForm={handleCloseForm} />
            </Dialog>
            <Message openAlert={openAlert} message={AlertMessage} severity={alertSeverity} handleCloseAlert={handleCloseAlert} />
            <Container sx={{ mb: 15 }}>
                <Grid container spacing={2}>
                    {items.map(item => (
                        <ItemCard item={item} handleOpenForm={handleOpenForm} key={item.id} />
                    ))}
                </Grid>
            </Container >
        </>
    )
}

export default items
