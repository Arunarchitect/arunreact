import React, { useState } from 'react';
import Layout from '../components/layout/Layout'
import { Box, Typography , FormControlLabel, InputLabel, Select ,MenuItem, Button } from '@mui/material'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import '../styles/Dash.css'
import BarChart from '../charts/BarChart';
import { FormControl } from '@mui/base/FormControl';



const Contact = () => {
  const [inputValue, setInputValue] = useState('');
  const [displayedValue, setDisplayedValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [budget, setBudget] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    
    // Check if the input is a positive integer
    if (/^[1-9]\d*$/.test(value) || value === '') {
      setInputValue(value);
      setErrorMessage('');
    } else {
      setErrorMessage('Please type a positive value');
    }
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleSubmit = () => {
    if (!errorMessage) {
      setDisplayedValue(inputValue);
    }
  };
  return (
    <Layout >
        <Box sx={{ display: 'flex' }} >
          <Box component='main' sx={{flexGrow: 1, p:3 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
            <Stack spacing={2} direction='row'>
              <Card sx={{ minWidth: 49 + '%', height: 100 }} className='gradient'>
                <CardContent>
                Enter you Builtup area
                </CardContent>
              </Card>
              <Card sx={{ minWidth: '49%', height: 100 }} className='gradient'>
                <CardContent>
                <FormControl>
                <input
                  type="text"
                  value={inputValue}
                  placeholder="Enter a positive integer"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    // Use parseInt to parse the input value as an integer
                    // If parsing fails, newValue will be an empty string
                    const intValue = parseInt(newValue);

                    // Check if intValue is a valid integer (not NaN) and update the state
                    if (!isNaN(intValue)) {
                      setInputValue(intValue);
                    } else {
                      // Handle the case where the input is not a valid integer (e.g., display an error message)
                      setInputValue('');
                    }
                  }}
                />
                  <InputLabel htmlFor="budget">Budget</InputLabel>
                  <Select
                    value={budget}
                    onChange={handleBudgetChange}
                    inputProps={{
                      id: 'budget',
                    }}
                  >
                    <MenuItem value="low">Low Budget</MenuItem>
                    <MenuItem value="medium">Medium Budget</MenuItem>
                    <MenuItem value="high">High Budget</MenuItem>
                  </Select>
                  <Button variant="contained" onClick={handleSubmit}>
                    Submit
                  </Button>
                </FormControl>
                </CardContent>
              </Card>
            </Stack>            
            </Grid>
            <Grid item xs={4}>
            <Stack spacing={2}>
              <Card sx={{ minWidth: 49 + '%', height: 43 }} className='gradient1'>

                  <div className='paddingall'>
                    <span>Your required area is {displayedValue} sq.ft</span>
                    {errorMessage && <div>{errorMessage}</div>}
                  </div>
              </Card>
              <Card sx={{ minWidth: 49 + '%', height: 43 }}  className='gradient2'>
                  <div className='paddingall'>
                    <span>Demo Dashboard</span> 
                  </div>
              </Card>
            </ Stack>     
            </Grid>
          </Grid>
          <Box height={20} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{minWidth: 20 + '%', height: 'vh' }}  className='gradient3'>
                <CardContent>
                  <BarChart title={displayedValue} budget={budget} /> {/* Pass displayedValue as a prop */}
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