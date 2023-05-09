import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dataSelector, isAuthSelector, logout } from '../../redux/slices/auth';

export const Header = () => {
  const isAuth = useSelector(isAuthSelector)
  const data = useSelector(dataSelector)

 

  const dispatch = useDispatch()

  const onClickLogout = () => {
  
    if (window.confirm("Are you sure you want to logout?")) {
        dispatch(logout())
        window.localStorage.removeItem('token')
    }

  };

  

  return (
  
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>COMMUNICATION</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>

               <Link to={`/person/${data._id}`}><Button variant='text' color="secondary" size="large"> <img className={styles.avatar} src={data.avatarUrl || '/noavatar.png'} alt={data.fullName} />{data.fullName}</Button></Link> 
                <Link to="/add-post">
                  <Button variant="contained" color="secondary" size="large">Create a post</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error" size="large">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined" color="success" size="large">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained" color="success" size="large">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
