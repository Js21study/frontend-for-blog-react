import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, isAuthSelector } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const isAuth = useSelector(isAuthSelector)
  const dispatch = useDispatch()


  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  
  const onSubmit = async(values) => {
    const data = await dispatch(fetchRegister(values))
    if (!data.payload) {
      alert('There is an error in the process of registration')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } 
  }
  if (isAuth) {
    return <Navigate to='/'/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        type='text'
        error={Boolean(errors.fullName)}
        {...register('fullName', {required: 'Write your name'})}
        helperText={errors.fullName ? errors.fullName.message : ''} 
        className={styles.field} 
        label="Name" 
        fullWidth />
      <TextField  
        type='email'
        error={Boolean(errors.email)}
        {...register('email', {required: 'Write your email'})}
        helperText={errors.email ? errors.email.message : ''} 
        className={styles.field} 
        label="E-Mail" 
        fullWidth />
      <TextField
        type='password'  
        error={Boolean(errors.password)}
        {...register('password', {required: 'Write your password'})}
        helperText={errors.password ? errors.password.message : ''}
        className={styles.field} 
        label="Password" 
        fullWidth />
      <Button disabled={!isValid} type='submit' size="large" variant="contained" color='success' fullWidth>
        Send
      </Button>
      </form>
    </Paper>
  );
};
