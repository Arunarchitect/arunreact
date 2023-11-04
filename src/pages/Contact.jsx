import React from 'react'
import Layout from '../components/layout/Layout'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import '../styles/Dash.css'


const Contact = () => {
  return (
    <Layout >
        <Box sx={{ display: 'flex' }} >
          <Box component='main' sx={{flexGrow: 1, p:3 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
            <Stack spacing={2} direction='row'>
              <Card sx={{ minWidth: 49 + '%', height: 100 }} className='gradient'>
                <CardContent>
                  $100
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 49 + '%', height: 100 }} className='gradient'>
                <CardContent>
                  $100  
                </CardContent>
              </Card>
            </Stack>            
            </Grid>
            <Grid item xs={4}>
            <Stack spacing={2}>
              <Card sx={{ minWidth: 49 + '%', height: 43 }} className='gradient1'>

                  <div className='paddingall'>
                    <span>$203k</span> 
                    <span>Total Income</span>
                  </div>
              </Card>
              <Card sx={{ minWidth: 49 + '%', height: 43 }}  className='gradient2'>
                  <div className='paddingall'>
                    <span>$203k</span> 
                    <span>Total Income</span>
                  </div>
              </Card>
            </ Stack>     
            </Grid>
          </Grid>
          <Box height={20} />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Card sx={{ height: 60 + 'vh' }}  className='gradient3'>
                <CardContent>

                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ height: 60 + 'vh' }}  className='gradient'>
                <CardContent>

                </CardContent>
              </Card>
              
            </Grid>
          </Grid>
          </Box>
        
      </Box>
    </Layout>
  )
}

export default Contact