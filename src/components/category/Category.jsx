import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './category.module.css'
import Loader from '../shared/Loader.jsx';
export default function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const getCategories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BURL}/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getCategories();
    }, [])
    if (loading) {
        return <Loader />
    }
    return (
        <Grid container spacing={4} className={`${styles.section}`}>
            {
                categories.map((category) =>
                    <Grid item size={{ xs: 12, sm: 6, md: 4, xl: 3 }} key={category.id}>
                        <Card >
                            <CardContent>
                                <Typography gutterBottom component={'div'} variant='h2'>
                                    {category.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size='small'>Details</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            }
        </Grid>
    );
}
