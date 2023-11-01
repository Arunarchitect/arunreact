import React from 'react'
import Layout from '../components/layout/Layout'
import { Box, Typography } from '@mui/material'

const Menu = () => {
  return (
    <Layout>
        <Box sx={{
          my:5,
          textAlign:"center",
          p:2,
          "& h4":{
            fontWeight:'bold',
            my:'2',
            fontSize:'2rem',
          },
          "& p":{
            textAlign:'justify',
            padding: '200px'
            
          },
          "@media (max-width:600px)":{
            mt:0,
          }
,        }}>
          <Typography variant='h4'>
            Tools
          </Typography>
          <p>
            The tools are under development!
          </p>
        </Box>
    </Layout>
  )
}

export default Menu