import React from 'react'

import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material'
import { Box } from '@mui/system'

function addItem() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" startIcon={<AddIcon />}>
                Add Item To Track
            </Button>
        </Box>
    )
}

export default addItem
