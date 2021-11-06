import { Paper, Typography, Link } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Copyright = () => {
    return (
        <Typography color="text.secondary" align='center'>
            Fullstack Academy - Copyright © &nbsp;
            <Link color="inherit" href="https://github.com/jmartin-code/price_tracker.git">
                Price Monitor
            </Link>
            &nbsp;{new Date().getFullYear()}.
        </Typography>
    );
}

const Footer = () => {
    return (
        <Paper square elevation={5} sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: "0",
            bottom: "0",
            width: "100%",
            zIndex: '1'
        }}>
            <Box component='footer'
                sx={{
                    py: 1
                }}
            >
                <Typography align='center'>
                    Jonathan Martinez
                </Typography>
                <Copyright />
            </Box>
        </Paper>
    )
}

export default Footer