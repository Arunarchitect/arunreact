import React, { useState } from 'react'
import { TextField, Box, Button, Alert} from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'

const UserLogin = () => {
    const [error, setError]= useState({
        status: false,
        msg:"",
        type:""
    })
    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const actualData = {
            email: data.get('email'),
            password: data.get('password')
        }
 
        if (actualData.email && actualData.password){
            console.log(actualData)
            document.getElementById('login-form').reset()
            setError({status:true, msg:"Success", type:'success'})
            navigate('/dashboard')
        }else{
            setError({status:true, msg:"All fields are required", type:'error'})
        }
    }
  return (
    <>
        <Box component='form' noValidate sx={{mt:1, mx:1}} id='login-form' onSubmit={handleSubmit}>
            <TextField margin='normal' required fullWidth
              id='email'
              label='Email Address'
              name='email'
            />
            <TextField margin='normal' required fullWidth
              id='password'
              label='Password'
              name='password'
              type='password'
            />
            <Box textAlign='center' >
                <Button type='submit' variant='contained' sx={{mt:3, mb:2, px:5}}>Login</Button>
            </Box>
            <NavLink to='/resetpass' >Forgot Password</NavLink>
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert>:''}
        </Box>
    </>
    )
  
}

export default UserLogin