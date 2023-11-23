import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import GanttChart from '../../charts/GanttChart';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Scheduler = () => {

  const [value,setValue] = useState(null)

  return (
    <Layout>
    <Box sx={{ flexGrow: 1, p: 3 }} style={{ backgroundColor: 'gray' }}>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ width: '100%', height: { xs: 240, sm: 300, md: 300, lg: 300 } }} className='gradient3'>
            <CardContent>
                <h2>Enter your Project Start Date</h2>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    label='Select Date'
                    value = {value}
                    onChange={(newValue)=>setValue(newValue)}
                    renderInput={(props)=><TextField{...props} />}
                    />
                </LocalizationProvider>
            </CardContent>
            </Card>
            <Card sx={{ width: '100%', height: { xs: 120, sm: 300, md: 300, lg: 300 }, mt: { xs: 2, sm: 2, md: 2, lg: 2 } }} className='gradient3'>
            <CardContent>
                <h2>Project Gist</h2>
                <p>Your required area is </p>
                <p>
                Your project can cost a total of Rs. 
                </p>
            </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ width: '100%', height: { xs: 300, sm: 615, md: 615, lg: 615 } }} className='gradient3'>
            <CardContent>
                <h2>Budget Split</h2>
                <GanttChart />
            </CardContent>
            </Card>
        </Grid>
        </Grid>
    </Box>
    </Layout>

  );
};

export default Scheduler;
