import { Add, Delete, Remove, RemoveCircle } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/shared/Loader.jsx';
import { Link } from 'react-router';


export default function Cart() {

  const [products, setProducts] = useState();
  const [isLoader, setIsLoader] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  let test = 0;
  const getProductFromCart = async () => {
    const token = localStorage.getItem("userToken");
    const response = await axios.get(`${import.meta.env.VITE_BURL}/Carts`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(response);
    setProducts(response.data.cartResponse);
    setTotalPrice(response.data.totalPrice);
    response.data.cartResponse.forEach((product) => {
      test = test + product.count
    });
    setTotalItems(test);
    console.log(totalItems);
    setIsLoader(false);
  }


  const increaseQty = async (id) => {

    const token = localStorage.getItem("userToken");

    const response = await axios.patch(`${import.meta.env.VITE_BURL}/Carts/increaseCount/${id}`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );


    //await getProductFromCart();

    const updatedProduct = products.map((product) => {

      if (product.id == id) {
        return { ...product, count: product.count + 1 }
      } else {
        return product;
      }
    });

    setProducts(updatedProduct);

    console.log(response);
  }


  const decreaseQty = async (id) => {

    const token = localStorage.getItem("userToken");

    const response = await axios.patch(`${import.meta.env.VITE_BURL}/Carts/decreaseCount/${id}`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );


    //await getProductFromCart();

    let updatedProduct = products.map((product) => {
      if (product.id == id) {
        return { ...product, count: product.count - 1 }
      } else {
        return product;
      }
    }).filter((product) => product.count > 0);
    setProducts(updatedProduct);
  }
  useEffect(() => {
    getProductFromCart();
  }, [])

  if (isLoader) {
    return <Loader />
  }
  return (
    <Box>
      <Typography variant='h2' gutterBottom>Shopping Cart</Typography>

      <Grid container spacing={2}>

        {/* <Grid item size={{ xs: 12, md: 8 }}> */}
        <Grid item size={{ xs: 12, md: 8 }}>
          {products.map((product) =>
            <Card sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', p: 2, mb: 2 }} key={product.id}>
              <CardMedia component={'img'} image='https://placehold.co/100' alt="" sx={{ borderRadius: 2, width: 200 }}></CardMedia>
              <CardContent>
                <Typography variant='h3'>{product.name}</Typography>
                <Typography variant='h4' color='primary'>{product.price}$</Typography>
              </CardContent>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
                <IconButton onClick={() => decreaseQty(product.id)}><Remove /></IconButton>
                <Typography>{product.count}</Typography>
                <IconButton onClick={() => increaseQty(product.id)}><Add /></IconButton>
                <IconButton color='error'><Delete /></IconButton>
              </Box>
            </Card>
          )}



        </Grid>

        <Grid item size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 2 }}>
            <Typography variant='h2' gutterBottom>Order Summary</Typography>
            <Typography>
              Total Items : {totalItems}
            </Typography>
            <Typography>
              Total Price : {totalPrice}$
            </Typography>
          </Card>

          <Button variant='contained' fullWidth component={Link} to='/checkout'>process to checkout</Button>
        </Grid>


      </Grid>
    </Box >
  )
}
