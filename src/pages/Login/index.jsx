import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, isAuthSelector } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const isAuth = useSelector(isAuthSelector)
  const dispatch = useDispatch()


  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async(values) => {
    const data = await dispatch(fetchAuth(values))
    if (!data.payload) {
      alert('There is an error on authorization')
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
        Login to account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="email"
        className={styles.field}
        label="E-Mail"
        error={Boolean(errors.email)}
        helperText={errors.email ? errors.email.message : ''}
        {...register('email', {required: 'Write your email'})}
        fullWidth
      />
      <TextField 
      type="password"
      className={styles.field} 
      label="Password"
      error={Boolean(errors.email)}
      helperText={errors.password ? errors.password.message : ''} 
      {...register('password', {required: 'Write your password'})} 
      fullWidth />
      <Button disabled={!isValid} type="submit" size="large" variant="contained" color='success' fullWidth>
        Login
      </Button>
      </form>
    </Paper>
  );
};
