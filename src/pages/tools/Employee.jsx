
import Layout from '../../components/layout/Layout'
import { Box, Card, CardContent, Typography, FormControlLabel, InputLabel, Select, MenuItem, Button, TextField, RadioGroup, Radio, Table, TableRow, TableCell,
  TableContainer, Paper, TableHead, TableBody } from '@mui/material'
import { Grid } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useGetJobprofileQuery } from '../../services/jobApi';
import moment from 'moment';





const Employee = () => {

  const { data } = useGetJobprofileQuery();
  const jobs = data ? data.jobs : []; 

  const calculateTotalHours = (startTime, endTime) => {
    const startMoment = moment(startTime);
    const endMoment = moment(endTime);

    const duration = moment.duration(endMoment.diff(startMoment));
    const totalHours = duration.asHours();

    return totalHours.toFixed(2); // Display total hours with two decimal places
  };

  const calculateGrandTotalHours = () => {
    let grandTotal = 0;
    jobs.forEach((job) => {
      grandTotal += parseFloat(calculateTotalHours(job.start_time, job.end_time));
    });
    return grandTotal.toFixed(2);
  };


  return (
    <Layout>
      <Box sx={{ flexGrow: 1, p: 3 }} style={{ backgroundColor: 'gray' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card sx={{ width: '100%', height: { xs: 240, sm: 300, md: 300, lg: 300 }, overflow: 'auto' }} className='gradient3'>
              <CardContent>
                <Typography variant="h5">Name</Typography>
                <Typography variant="h6">Designation</Typography>
                <Typography variant="h6">Involved Projects</Typography>
              </CardContent>
              <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Project Name</TableCell>
                      <TableCell>Work Name</TableCell>
                      <TableCell>Start Time</TableCell>
                      <TableCell>End Time</TableCell>
                      <TableCell>Total Hours</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>{job.project.name}</TableCell>
                        <TableCell>{job.work.name}</TableCell>
                        <TableCell>{moment(job.start_time).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                        <TableCell>{moment(job.end_time).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                        <TableCell>{calculateTotalHours(job.start_time, job.end_time)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
            <Card sx={{ width: '100%', height: { xs: 120, sm: 300, md: 300, lg: 300 }, mt: { xs: 2, sm: 2, md: 2, lg: 2 } }} className='gradient3'>
              <CardContent>
                <h2>Work Data Dashboard</h2>
                <Typography variant="h6">Grand Total Hours: {calculateGrandTotalHours()}</Typography>
                <Typography variant="h6">Revenue in Rs: {100 * calculateGrandTotalHours()}</Typography>
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
                    <InputLabel htmlFor="budget1">Project</InputLabel>
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
                    <InputLabel htmlFor="budget1">Work</InputLabel>
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
