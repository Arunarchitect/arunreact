import React from 'react';
import Layout from '../../components/layout/Layout';
import { Box, Grid, Card, CardContent } from '@mui/material';
import '../../styles/Dash.css';

const Projects = () => {
  const projects = [
    { title: 'Project 1', description: 'Description for Project 1' },
    { title: 'Project 2', description: 'Description for Project 2' },
    { title: 'Project 3', description: 'Description for Project 3' },
    { title: 'Project 4', description: 'Description for Project 4' },
  ];

  const ProjectCard = ({ title, description }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} className='gradient3'>
      <CardContent>
        <h5>{title}</h5>
        <p>{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, p: 3 }} style={{ backgroundColor: 'gray' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ width: '100%', height: { xs: 240, sm: 300, md: 300, lg: 300 } }} className='gradient3'>
              <CardContent>
                <h2>Profile Info</h2>
              </CardContent>
            </Card>
            <Card sx={{ width: '100%', height: { xs: 120, sm: 300, md: 300, lg: 300 }, mt: { xs: 2, sm: 2, md: 2, lg: 2 } }} className='gradient3'>
              <CardContent>
                <h2>Project Detail</h2>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ height: '100%' }} className='gradient3'>
              <CardContent>
                
                <h2>My projects</h2>
                {projects.map((project, index) => (
                  <ProjectCard key={index} title={project.title} description={project.description} />
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Projects;
