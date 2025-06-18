import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/index.js'
  import { ToastContainer } from 'react-toastify';

import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
   <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      <ToastContainer />
    </ThemeProvider>
)
