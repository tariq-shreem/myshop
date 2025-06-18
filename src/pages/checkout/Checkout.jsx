import { Box, Button, Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";


export default function Checkout() {


    const [paymentMethod, setPaymentMethod] = useState('Visa');

    const handlePaymentMethod = (event) => {
        setPaymentMethod(event.target.value);
    }

    const handlePay = async () => {
        const token = localStorage.getItem("userToken");
        const response = await axios.post(`${import.meta.env.VITE_BURL}/CheckOuts/Pay`, {
            PaymentMethod: paymentMethod,
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        if (paymentMethod == 'Visa') {
            location.href = response.data.url
        }

        console.log(response);
    }

    return (
        <Box>
            <Card sx={{ p: 4 }}>
                <Typography variant="h2">Chckout</Typography>
                <FormControl>
                    <Typography variant="h3"> Select Payment Method </Typography>
                    <RadioGroup value={paymentMethod} onChange={handlePaymentMethod}>
                        <FormControlLabel value="Visa" control={<Radio />} label="Visa" />  <FormControlLabel value="Cash" control={<Radio />} label="Cash on Delivery" />
                    </RadioGroup>
                </FormControl>

                <Button onClick={handlePay} fullWidth variant="contained"> Confirm Payment  </Button>
            </Card>
        </Box>
    )
}
