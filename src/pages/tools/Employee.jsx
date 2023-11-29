
import Layout from '../../components/layout/Layout'
import { Box, Card, CardContent, Typography, FormControlLabel, InputLabel, Select, MenuItem, Button, TextField, RadioGroup, Radio } from '@mui/material'
import { Grid } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';



const Employee = () => {

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, p: 3 }} style={{ backgroundColor: 'gray' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ width: '100%', height: { xs: 240, sm: 300, md: 300, lg: 300 } }} className='gradient3'>
              <CardContent>
                <Typography variant="h5">Name</Typography>
                <Typography variant="h6">Designation</Typography>
                <Typography variant="h6">Involved Projects</Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: '100%', height: { xs: 120, sm: 300, md: 300, lg: 300 }, mt: { xs: 2, sm: 2, md: 2, lg: 2 } }} className='gradient3'>
              <CardContent>
                <h2>Work Data Dashboard</h2>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card sx={{ width: '100%', height: { xs: 300, sm: 615, md: 615, lg: 615 } }} className='gradient3'>
            <CardContent>
                <Typography variant="h5">Add work</Typography>
                <Typography variant="h6">Record your Work</Typography>

                <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                    <div>
                    <InputLabel htmlFor="budget1">Budget</InputLabel>
                    <Select
                    sx={{ width: '100%', height: '40px', padding: 1 }}
                    id="budget1"
                    defaultValue="" // Set the default value to an available option (in this case, an empty string)
                    >
                    <MenuItem value="" disabled>
                        Choose your Project
                    </MenuItem>
                    <MenuItem value="low">Project 1</MenuItem>
                    <MenuItem value="medium">Project 2</MenuItem>
                    <MenuItem value="high">Project 3</MenuItem>
                    </Select>
                    </div>

                    <div>
                    <InputLabel htmlFor="budget1">Budget</InputLabel>
                    <Select
                    sx={{ width: '100%', height: '40px', padding: 1 }}
                    id="budget1"
                    defaultValue="" // Set the default value to an available option (in this case, an empty string)
                    >
                    <MenuItem value="" disabled>
                        Choose your Work
                    </MenuItem>
                    <MenuItem value="low">Work 1</MenuItem>
                    <MenuItem value="medium">Work 2</MenuItem>
                    <MenuItem value="high">Work 3</MenuItem>
                    </Select>
                    </div>
                </div>


                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label='Start Time'
                    required 
                    sx={{ width: '48%', padding:1 }} // Set the width to 50%
                />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label='End Time'
                    required 
                    sx={{ width: '48%', padding:1 }} // Set the width to 50%
                />
                </LocalizationProvider>
                <Button variant="contained" sx={{  padding:2 }} >
                  Add work data
                </Button>

            </CardContent>
          </Card>

          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default Employee;
