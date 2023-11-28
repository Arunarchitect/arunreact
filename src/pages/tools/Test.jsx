import React, { useState } from 'react';
import Layout from '../../components/layout/Layout'
import { Box, Typography, FormControlLabel, InputLabel, Select, MenuItem, Button, TextField, RadioGroup, Radio } from '@mui/material'
import { Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material'
import Stack from '@mui/material/Stack'
import '../../styles/Dash.css'
import BarChart from '../../charts/BarChart';
import { FormControl } from '@mui/base/FormControl'
import PdfGenerator from '../../PDF/PdfGenerator';

const Test = () => {
  const [inputValue, setInputValue] = useState('');
  const [displayedValue, setDisplayedValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [budget, setBudget] = useState('medium');
  const [selectedUnit, setSelectedUnit] = useState('squareFeet'); // Default unit

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

  const [entryValue, setEntryValue] = useState(0);

  // ...

  const handleEntryValueChange = (value) => {
    // Update the entry value when it changes in the BarChart component
    setEntryValue(value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  const handleSubmit = () => {
    if (!errorMessage) {
      setDisplayedValue(inputValue);
    }
  };

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, p: 3 }} style={{ backgroundColor: 'gray' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ width: '100%', height: { xs: 240, sm: 300, md: 300, lg: 300 } }} className='gradient3'>
              <CardContent>
                <h2>Enter your built-up area</h2>
                <FormControl>
                  <Box row='true'>
                    <TextField
                      type="text"
                      value={inputValue}
                      placeholder="Enter a positive integer"
                      onChange={handleInputChange}
                    />
                    <RadioGroup
                      row
                      aria-label="unit"
                      name="unit"
                      value={selectedUnit}
                      onChange={handleUnitChange}
                    >
                      <FormControlLabel value="squareFeet" control={<Radio />} label="Square Feet" />
                      <FormControlLabel value="squareMeter" control={<Radio />} label="Square Meter" />
                    </RadioGroup>
                  </Box>
                  
                  <InputLabel htmlFor="budget">Budget</InputLabel>
                  <Select
                    value={budget}
                    onChange={handleBudgetChange}
                    displayEmpty // This property will display the placeholder
                    inputProps={{
                      id: 'budget',
                    }}
                  >
                    <MenuItem value="" disabled>
                      Choose your budget
                    </MenuItem>
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
            <Card sx={{ width: '100%', height: { xs: 120, sm: 300, md: 300, lg: 300 }, mt: { xs: 2, sm: 2, md: 2, lg: 2 } }} className='gradient3'>
              <CardContent>
                <h2>Project Gist</h2>
                <p>Your required area is {displayedValue} {selectedUnit === 'squareFeet' ? 'sq.ft' : 'sq.m'}</p>
                <p>
                  Your project can cost a total of Rs.{entryValue}. 
                </p>
              
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ width: '100%', height: { xs: 300, sm: 615, md: 615, lg: 615 } }} className='gradient3'>
              <CardContent>
                <h2>Budget Split</h2>
                <BarChart title={displayedValue} budget={budget} unit={selectedUnit} onEntryValueChange={handleEntryValueChange} /> {/* Pass displayedValue and selectedUnit as props */}
                <PdfGenerator />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default Test;
