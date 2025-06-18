import { Box, Button, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import styles from './login.module.css'
import { AccountCircle, AlternateEmail, InsertInvitation, Password } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Bounce, toast } from 'react-toastify'
export default function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const loginUser = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BURL}/Account/Login`, values);
      localStorage.setItem("userToken", response.data.token);
      console.log(response);
      toast.success('Logged in successfully', {
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
      navigate('/');
    } catch (error) {
      if (error.status == 400) {
        console.log(error);
        toast.error(`${error.response.data.message}`, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        toast.error(" An unexpected error occurred. Please try again.", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Box component={'form'}
      className={styles.formContianer}
      onSubmit={handleSubmit(loginUser)}>

      <TextField
        {...register('email', {
          required: "Email is required",
          minLength: {
            value: 5,
            message: "Email must be at least 5 characters"
          },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address"
          }
        })}
        label="user email"
        type='email'
        sx={{ m: 1 }}
        fullWidth
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">
              <AlternateEmail />
            </InputAdornment>,
          },
        }}
        helperText={errors.email?.message}
        error={errors.email}

      />
      <TextField
        {...register('password')}

        label=" password"
        type='password'

        sx={{ m: 1 }}
        fullWidth
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">
              <Password />
            </InputAdornment>,
          },
        }}
      />

      <Button variant="outlined" type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </Button>
    </Box>
  )
}
