import React, { useState } from 'react'
import { TextField, Box, Button, Alert, Typography} from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../../services/testApi'

const UserLogin = () => {
    const [server_error, setServerError] = useState({})
    const navigate = useNavigate()
    const [loginUser, {isLoading}] = useLoginUserMutation()
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const actualData = {
            email: data.get('email'),
            password: data.get('password')
        }
        const res = await loginUser(actualData)
        if (res.error){
            console.log(res.error.data.errors);
            setServerError(res.error.data.errors)
        }
        if (res.data){
            console.log(res.data);
            navigate('/dashboard');          
        }
 
    }
  return (
    <>
        {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]):""}
        {/* {server_error.email ? console.log(server_error.email[0]):""}
        {server_error.password ? console.log(server_error.password[0]):""} */}

        <Box component='form' noValidate sx={{mt:1, mx:1}} id='login-form' onSubmit={handleSubmit}>
            <TextField margin='normal' required fullWidth
              id='email'
              label='Email Address'
              name='email'
            />
            {server_error.email ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}} >{server_error.email[0]}</Typography>:""}
            <TextField margin='normal' required fullWidth
              id='password'
              label='Password'
              name='password'
              type='password'
            />
            {server_error.password ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}} >{server_error.password[0]}</Typography>:""}
            
            <Box textAlign='center' >
                <Button type='submit' variant='contained' sx={{mt:3, mb:2, px:5}}>Login</Button>
            </Box>
            <NavLink to='/resetpass' >Forgot Password</NavLink>
            {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert>:""}
            
        </Box>
    </>
    )
  
}

export default UserLogin