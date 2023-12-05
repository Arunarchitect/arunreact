
import Layout from '../../components/layout/Layout'
import { Box, Card, CardContent, Typography, FormControlLabel, InputLabel, Select, MenuItem, Button, TextField, RadioGroup, Radio, Table, TableRow, TableCell,
  TableContainer, Paper, TableHead, TableBody } from '@mui/material'
import { Grid } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';  // Import dayjs library
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useGetJobprofileQuery, useSaveProfileMutation, useGetProjectprofileQuery , useGetWorkprofileQuery} from '../../services/jobApi';
import moment from 'moment';
import { useState } from 'react';





const Employee = () => {

  const { data: jobData } = useGetJobprofileQuery(); // Rename data to jobData
  const { data: projectData } = useGetProjectprofileQuery(); // Assuming useGetProjectsQuery is a separate hook for fetching projects
  const { data: taskData } = useGetWorkprofileQuery(); 

  const jobs = jobData ? jobData.jobs : [];
  const projects = projectData ? projectData.projects : []; 
  console.log('projectData:', projectData);

  const tasks = taskData ? taskData.work : []; 
  console.log('taskData:', taskData);


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

  const saveProfileMutation = useSaveProfileMutation();

  // State variables for form data
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedWork, setSelectedWork] = useState('');
  const [startTime, setStartTime] = useState(dayjs());  // Initialize with dayjs()
  const [endTime, setEndTime] = useState(dayjs());      // Initialize with dayjs()

  const handleAddWorkData = async () => {
    // Prepare the data object in the correct JSON format
    const postData = {
      project: {
        id: selectedProject,
        name: `Project ${selectedProject}`, // Replace with the actual project name logic
      },
      work: {
        id: selectedWork,
        name: `Work ${selectedWork}`, // Replace with the actual work name logic
      },
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
    };

    try {
      // Make the POST request using the save profile mutation hook
      const response = await saveProfileMutation.mutateAsync(postData);

      // Handle the response, e.g., show success message or navigate to another page
      console.log('Job posted successfully:', response);
    } catch (error) {
      // Handle the error, e.g., show error message to the user
      console.error('Error posting job:', error);
    }
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
                {/* Project Dropdown */}
                {/* Project Dropdown */}
                <div>
                  <InputLabel htmlFor="projectDropdown">Project</InputLabel>
                  <Select
                    sx={{ width: '100%', height: '40px', padding: 1 }}
                    id="projectDropdown"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                  >
                    <MenuItem value="" disabled>
                      Choose your Project
                    </MenuItem>
                    {projectData && projectData.jobs && projectData.jobs.map((project) => (
                      <MenuItem key={project.id} value={project.id}>
                        {project.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>



                {/* Work Dropdown */}
                <div>
                  <InputLabel htmlFor="workDropdown">Work</InputLabel>
                  <Select
                    sx={{ width: '100%', height: '40px', padding: 1 }}
                    id="workDropdown"
                    value={selectedWork}
                    onChange={(e) => setSelectedWork(e.target.value)}
                  >
                    <MenuItem value="" disabled>
                      Choose your Project
                    </MenuItem>
                    {taskData && taskData.jobs && taskData.jobs.map((task) => (
                      <MenuItem key={task.id} value={task.id}>
                        {task.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                {/* Start Time DateTimePicker */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Start Time"
                    required
                    sx={{ width: '48%', padding: 1 }}
                    value={startTime}
                    onChange={(value) => setStartTime(value)}
                  />
                </LocalizationProvider>

                {/* End Time DateTimePicker */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="End Time"
                    required
                    sx={{ width: '48%', padding: 1 }}
                    value={endTime}
                    onChange={(value) => setEndTime(value)}
                  />
                </LocalizationProvider>

                {/* Button to Add work data */}
                <Button variant="contained" sx={{ padding: 2 }} onClick={handleAddWorkData}>
                  Add work data
                </Button>
              </div>

            </CardContent>
          </Card>

          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default Employee;
