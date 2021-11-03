import React from 'react'
//////// UI /////////
import { Button, Chip, Grid, Paper, Typography } from '@mui/material'

///// ICONS ////////
import TimerIcon from '@mui/icons-material/Timer';
import CheckIcon from '@mui/icons-material/Check';
import { Box } from '@mui/system';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

function itemCard({ item }) {

    const handleRemove = () => {
        console.log('remove')
    }
    const handleUpdate = () => {
        console.log('update')
    }


    return (
        <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, ':hover': { boxShadow: 8 } }}>
                {item.targetPrice < item.price ? (
                    <Button href={item.link} target="_blank" rel="noopener noreferrer" variant="outlined" color="success" fullWidth endIcon={<CheckIcon />} sx={{ m: 1, borderRadius: 5 }}>
                        It is time to buy!
                    </Button>
                ) :
                    (<Button href={item.link} target="_blank" rel="noopener noreferrer" variant="outlined" color="error" fullWidth endIcon={<TimerIcon />} sx={{ m: 1, borderRadius: 5 }}>
                        Let's wait for a deal!
                    </Button>)}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.imageURL} height='50' />
                    <Typography sx={{ ml: 2 }}>
                        {item.name}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                    <Typography variant='body1'>
                        Price: ${item.price}
                    </Typography>
                    <Typography variant='body1'>
                        Target Price: ${item.targetPrice}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    <Chip label='Update' color="primary" size="small" icon={<EditIcon />} sx={{ mx: 1 }} onClick={handleUpdate} />
                    <Chip label='Remove' color="error" size="small" icon={<HighlightOffIcon />} sx={{ mx: 1 }} onClick={handleRemove} />
                </Box>
            </Paper>
        </Grid>
    )
}

export default itemCard
