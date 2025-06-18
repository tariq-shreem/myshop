import { Box, Button, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import styles from './register.module.css'
import { AccountCircle, AlternateEmail, InsertInvitation, Password } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
export default function Register() {

  const { register, handleSubmit } = useForm();

  const registerUser = async (values) => {

    const response = await axios.post(`${import.meta.env.VITE_BURL}/Account/register`, values);
    console.log(response);
  }
  return (
    <Box component={'form'}
      className={styles.formContianer}
      onSubmit={handleSubmit(registerUser)}>
      <TextField
        {...register('firstName')}
        label="first name"
        sx={{ m: 1 }}
        fullWidth
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>,
          },
        }}
      />
      <TextField
        {...register('lastName')}
        label="last name"
        sx={{ m: 1 }}
        fullWidth
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>,
          },
        }}
      />
      <TextField
        {...register('userName')}
        label="user name"
        sx={{ m: 1 }}
        fullWidth
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>,
          },
        }}
      />
      <TextField
        {...register('email')}

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
      <TextField
        {...register('confirmPassword')}

        type='password'
        label="confirmation password"
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
      <TextField
        {...register('birthOfDate')}
        type='date'
        label="birth Of Date"
        sx={{ m: 1 }}
        fullWidth
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">
              <InsertInvitation />
            </InputAdornment>,
          },
        }}
      />


      <Button variant='outlined' type='submit'>Register</Button>

    </Box>
  )
}
