
import Layout from '../../components/layout/Layout'
import { Box, Card, CardContent, Typography, FormControlLabel, InputLabel, Select, MenuItem, Button, TextField, RadioGroup, Radio, Table, TableRow, TableCell, Alert,
  TableContainer, Paper, TableHead, TableBody } from '@mui/material'
import { Grid } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';  // Import dayjs library
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useGetJobprofileQuery, useSaveProfileMutation, useGetProjectprofileQuery , useGetWorkprofileQuery} from '../../services/jobApi';
import moment from 'moment';
import { useState , useRef, useEffect} from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import jsPDF from 'jspdf'
import 'jspdf-autotable'





const Employee = () => {

  const { data: jobData } = useGetJobprofileQuery(); // Rename data to jobData
  const { data: projectData } = useGetProjectprofileQuery(); // Assuming useGetProjectsQuery is a separate hook for fetching projects
  const { data: taskData } = useGetWorkprofileQuery(); 
  const [saveProfile] = useSaveProfileMutation();

  // excel export function
  const tableref = useRef(null)
  const data = [
    
  ]
  const {onDownload} = useDownloadExcel({
    currentTableRef:tableref.current,
    filename:'Job_report',
    sheet: 'UserData'
  })

  //pdf export function
  const downloadPdf = () => {
    const doc = new jsPDF();
  
    // Title
    doc.text("Job Report", 20, 10);
  
    // Table headers
    const headers = ["Project Name", "Work Name", "Start Time", "End Time", "Total Hours"];
  
    // Table data
    const data = jobs.map((job) => [
      job.project.name,
      job.work.name,
      moment(job.start_time).format('YYYY-MM-DD HH:mm:ss'),
      moment(job.end_time).format('YYYY-MM-DD HH:mm:ss'),
      calculateTotalHours(job.start_time, job.end_time),
    ]);
  
    // Add the table to the PDF
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 20, // Adjust the starting Y position as needed
    });
  
    // Save the PDF
    doc.save('Job_Report.pdf');
  };
  
  

  const jobs = jobData ? jobData.jobs : [];
  const projects = projectData ? projectData.projects : []; 

  // Immediately calculate revenue with the default value
  useEffect(() => {
    if (jobs.length > 0) {
      calculateRevenue();
    }
  }, [jobs]); // Trigger when jobs data changes
  

  const tasks = taskData ? taskData.work : []; 
  // console.log('taskData:', taskData);

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });


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


  const [pproject, setPproject] = useState('');
  const [pwork, setPwork] = useState('');
  const [pstartdate, setPstartdate] = useState(new Date());
  const [penddate, setPenddate] = useState(new Date());


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('pproject:', pproject);
    // console.log('pwork:', pwork);
  
    // Check if all required fields are filled
    if (pproject && pwork && pstartdate && penddate) {
      // Create an object with the required fields
      const formData = new FormData();
      formData.append('pproject_id', pproject.id);
      formData.append('pproject_name', pproject.name);
      formData.append('pwork_id', pwork.id);
      formData.append('pwork_name', pwork.name);;
      formData.append('pstartdate', dayjs(pstartdate).format("YYYY-MM-DDTHH:mm:ssZ"));
      formData.append('penddate', dayjs(penddate).format("YYYY-MM-DDTHH:mm:ssZ"));

      console.log('FormData:', formData);
      console.log('pproject:', pproject);
      console.log('pwork:', pwork);
      console.log('pstartdate:', pstartdate);
      console.log('penddate:', penddate);


      try {
        // Trigger the saveProfile mutation with the form data
        const res = await saveProfile(formData).catch((error) => {
          console.error('Error during saveProfile mutation:', error);
          setError({ status: true, msg: 'An error occurred', type: 'error' });
        });
  
        // Check the response from the server
        if (res && res.data && res.data.status === 'success') {
          // Display a success message and reset the form
          setError({ status: true, msg: 'Uploaded Successfully', type: 'success' });
          resetForm();
          refetch(); // Refetch the data to update the job list
        } else {
          // Display an error message if the server response indicates failure
          setError({ status: true, msg: 'Upload Failed', type: 'error' });
        }
      } catch (error) {
        // Handle errors that may occur during the form submission
        console.error('Error during form submission:', error);
        setError({ status: true, msg: 'An error occurred', type: 'error' });
      }
    } else {
      // Display an error message if any required field is missing
      setError({ status: true, msg: 'All fields are required', type: 'error' });
    }
  };

  //payment calculation
  const [paymentPerHour, setPaymentPerHour] = useState(100); // Set the default value to 100
  const [revenue, setRevenue] = useState(0);

  // Immediately calculate revenue with the default value
  useEffect(() => {
    calculateRevenue();
  }, []); // Trigger on component mount

  // Calculate revenue when the component mounts or when paymentPerHour changes
  useEffect(() => {
    calculateRevenue();
  }, [paymentPerHour]); // Trigger when paymentPerHour changes

  const calculateRevenue = () => {
    const grandTotalHours = parseFloat(calculateGrandTotalHours());
    const paymentPerHourValue = parseFloat(paymentPerHour || 100); // Use the provided value or default to 100
    const revenueValue = grandTotalHours * paymentPerHourValue;
    setRevenue(revenueValue.toFixed(2));
  };


    

  

  
  

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, p: 3 }} style={{ backgroundColor: 'gray' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card sx={{ width: '100%', height: { xs: 350, sm: 300, md: 300, lg: 300 }, overflow: 'auto' }} className='gradient3'>
              <CardContent>
                <Typography variant="h5">Name</Typography>
                <Typography variant="h6">Designation</Typography>
                <Typography variant="h6">Involved Projects</Typography>
              </CardContent>
              <TableContainer component={Paper} sx={{ overflowX: 'auto' }} >
                <Table  ref={tableref}>
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
            <Card sx={{ width: '100%', height: { xs: 350, sm: 300, md: 300, lg: 300 }, mt: { xs: 2, sm: 2, md: 2, lg: 2 ,padding: 2  } }} className='gradient3'>
              <CardContent>
                <h2>Work Data Dashboard</h2>
                <Typography variant="h6">Grand Total Hours: {calculateGrandTotalHours()}</Typography>
                <Typography variant="h6">Payment per hour</Typography>
                <TextField
                  type="number"
                  value={paymentPerHour}
                  onChange={(e) => {
                    setPaymentPerHour(e.target.value);
                    calculateRevenue(); // Calculate revenue instantly on value change
                  }}
                  sx={{ width: '100%', padding: 1 }}
                />


                <Typography variant="h6">Revenue in Rs: {revenue}</Typography>

                <br />
                <Button variant="contained" sx={{ width: '100%', padding: 1 }} onClick={downloadPdf}>
                  Download PDF
                </Button>
                <br />
                <br />
                <Button variant="contained" sx={{ width: '100%', padding: 1 }} onClick={onDownload}>
                  Download Excel Report
                </Button>
              </CardContent> 
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card sx={{ width: '100%', height: { xs: 500, sm: 615, md: 615, lg: 615 } }} className='gradient3'>
  <CardContent>
    <Typography variant="h5">Add work</Typography>
    <Typography variant="h6">Record your Work</Typography>

    {/* Project Dropdown */}
    <div style={{ width: '100%' }}>
      <InputLabel htmlFor="projectDropdown">Project</InputLabel>
      <Select
  value={pproject ? pproject.id : ''}
  onChange={(e) => {
    const selectedProject = projectData.jobs.find((project) => project.id === e.target.value);
    setPproject(selectedProject);
  }}
  sx={{ width: '100%', height: '40px', padding: 1 }}
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
<div style={{ width: '100%' }}>
  <InputLabel htmlFor="workDropdown">Work</InputLabel>
  <Select
  value={pwork? pwork.id : ''}
  onChange={(e) => {
    const selectedWork = taskData.jobs.find((task) => task.id === e.target.value);
    setPwork(selectedWork);
  }}
  sx={{ width: '100%', height: '40px', padding: 1 }}
>
  <MenuItem value="" disabled>
    Choose your Work
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
        // value={pstartdate}
        // onChange={(date) => setPstartdate(date)}
        required
        sx={{ width: '100%', padding: 1 }}
      />
    </LocalizationProvider>

    {/* End Time DateTimePicker */}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="End Time"
        // value={penddate}
        // onChange={(date) => setPenddate(date)}
        required
        sx={{ width: '100%', padding: 1 }}
      />
    </LocalizationProvider>

    {/* Button to Add work data */}
    <Button variant="contained" sx={{ width: '100%', padding: 2 }} onClick={handleSubmit}>
      Add work data
    </Button>
    {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
  </CardContent>
</Card>

          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default Employee;
