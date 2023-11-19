import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChangePassword from './auth/ChangePassword';
import Layout from '../components/layout/Layout';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { unsetUserToken } from '../features/authSlice';
import { useGetLoggedUserQuery } from '../services/testApi';
import { useEffect, useState } from 'react';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { access_token } = getToken()
  const { data, isSuccess } = useGetLoggedUserQuery(access_token)
  const [userData, setUserData] = useState({
    email: "",
    name: ""
  })
  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.email,
        name: data.name,
      })
    }
  }, [data, isSuccess])

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        email: data.email,
        name: data.name
      }))
    }
  }, [data, isSuccess, dispatch])

  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }))
    dispatch(unsetUserToken({access_token:null}))
    removeToken()
    navigate('/login')
  }
  return <Layout>
    <CssBaseline />
    <Grid container>
      <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
        <h1>Dashboard</h1>
        <Typography variant='h5'>Email: {userData.email}</Typography>
        <Typography variant='h6'>Hi {userData.name}, Welcome to the world of Modelflick</Typography>
        <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button>
      </Grid>
      <Grid item sm={8}>
        <ChangePassword />
      </Grid>
    </Grid>
  </Layout>;
};

export default Dashboard;
