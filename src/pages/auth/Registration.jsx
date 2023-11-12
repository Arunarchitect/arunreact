import React, { useState } from 'react'
import { TextField, Box, Button, Alert, FormControlLabel, Checkbox} from '@mui/material'
import {  useNavigate } from 'react-router-dom'


const Registration = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
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
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
            password_confirm: data.get('password_confirm'),
            tc: data.get('tc')
        }
 
        if (actualData.name && actualData.email && actualData.password && actualData.tc !== null){
            if (actualData.password === actualData.password_confirm){
                console.log(actualData)
                document.getElementById('registration-form').reset()
                document.getElementById('tc').checked = false; // Reset the checkbox to unchecked
                setError({status:true, msg:"Registration Success", type:'success'})
                navigate('/')
            }
            else{
                setError({status:true, msg:"Both passwords doesnt match", type:'error'})
            }
        }else{
            setError({status:true, msg:"All fields are required", type:'error'})
        }
    }
  return (
    <>
        <Box component='form' noValidate sx={{mt:1, mx:1}} id='registration-form' onSubmit={handleSubmit}>
            <TextField margin='normal' required fullWidth
              id='name'
              label='Name'
              name='name'
            />
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
            <TextField margin='normal' required fullWidth
              id='password_confirm'
              label='Retype-Password'
              name='password_confirm'
              type='password'
            />
            <FormControlLabel
            control={
                <Checkbox
                value='agree'
                color='primary'
                name='tc'
                id='tc'
                checked={isChecked}
                onChange={handleCheckboxChange}
                />
            }
            label='I agree to the terms'
            />
            <Box textAlign='center' >
                <Button type='submit' variant='contained' sx={{mt:3, mb:2, px:5}}>Register</Button>
            </Box>
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert>:''}
        </Box>
    </>
  )
}

export default Registration