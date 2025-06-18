import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Loader from '../../components/shared/Loader.jsx';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Bounce, toast } from 'react-toastify';
import { CartContext } from '../../context/CartContext.jsx';

export default function Product() {

    const { id } = useParams('id');
    const [product, setProduct] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const getProduct = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BURL}/products/${id}`);
        setProduct(response.data);
        setLoading(false);
    }
    const addToCart = async (id) => {
        try {
            setLoading(true);
            const userToken = localStorage.getItem("userToken");
            const response = await axios.post(`${import.meta.env.VITE_BURL}/Carts/${id}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );
            toast.success('product added to cart', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

        } catch (error) {

        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getProduct();
    }, [])
    if (isLoading) {

        return <Loader />
    }
    return (
        <Card>
            <CardContent>
                <Typography component={'h2'}>
                    {product.name}
                </Typography>
                <Typography component={'p'}>
                    {product.description}
                </Typography>

                <Button onClick={() => addToCart(product.id)}>Add To Cart</Button>
            </CardContent>
        </Card>
    )
}
