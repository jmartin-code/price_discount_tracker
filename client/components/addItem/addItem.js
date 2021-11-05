import React, { useState } from 'react'

////////// UI //////////////
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog } from '@mui/material'
import { Box } from '@mui/system'

//////////// COMPONENT /////////////
import Form from './From'

function addItem() {
    const [openForm, setopenForm] = useState(false)

    const handleOpenForm = () => {
        setopenForm(true)
    }

    const handleCloseForm = () => {
        setopenForm(false)
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleOpenForm} variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: 5 }}>
                    Add New Item To Track
                </Button>
            </Box>
            <Dialog open={openForm} onClose={handleCloseForm}>
                <Form title={'ADD NEW ITEM'} handleCloseForm={handleCloseForm} />
            </Dialog>
        </>
    )
}

export default addItem
