import React, { useState } from 'react'
import {Grid, TextField, Button, Box, Alert} from '@mui/material'
import Layout from '../../components/layout/Layout'

const SendPasswordResetEmail = () => {
    const [error, setError]= useState({
        status: false,
        msg:"",
        type:""
    })

    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const actualData = {
            email: data.get('email'),
        }
 
        if (actualData.email ){
            console.log(actualData)
            document.getElementById('passwordreset-form').reset()
            setError({status:true, msg:"Password reset email send, please check your inbox", type:'success'})
    
        }else{
            setError({status:true, msg:"Please provide a valid email", type:'error'})
        }
    }
  return (
    <Layout>
        <Grid container justifyContent='center'>
            <Grid item sm={6} xs={12}>
                <Box component='form' noValidate sx={{mt:1}} id='passwordreset-form' onSubmit={handleSubmit}>
                    <TextField margin='normal' required fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    />
                    <Box textAlign='center' >
                        <Button type='submit' variant='contained' sx={{mt:3, mb:2, px:5}}>Send</Button>
                    </Box>
                    {error.status ? <Alert severity={error.type}>{error.msg}</Alert>:''}
                </Box>
            </Grid>
        </Grid>
    </Layout>
    )
}

export default SendPasswordResetEmail