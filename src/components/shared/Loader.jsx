import { Backdrop, Button, CircularProgress } from '@mui/material'
import React from 'react'

export default function Loader() {
    return (
        <Backdrop
            sx={(theme) => ({ color: '#000', zIndex: theme.zIndex.drawer + 1 })}
            open={open}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
    )
}
