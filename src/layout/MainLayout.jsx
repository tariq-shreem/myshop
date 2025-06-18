import React from 'react'
import Navbar from '../components/navbar/Navbar.jsx'
import Footer from '../components/footer/Footer.jsx'
import { Outlet } from 'react-router'
import { Container } from '@mui/material'
import CartContextProvider from '../context/CartContext.jsx'

export default function MainLayout() {
  return (
    <>
      <CartContextProvider>

        <Navbar />
      <Container>

        <Outlet />
      </Container>
      <Footer />
      </CartContextProvider>
    </ >
  )
}
