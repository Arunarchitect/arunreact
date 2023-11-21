import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import { useParams } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../styles/Dash.css';

import { useGetResumeprofileQuery } from '../services/testApi';

const Blog = () => {


  // Fetch data from Django API
  const { data, isSuccess } = useGetResumeprofileQuery();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      // Assuming your API response has a 'blogs' field containing the required data
      setBlogs(data.blogs);
    }
  }, [data, isSuccess]);

  return (
    <Layout>
      <Grid container spacing={2} padding={3} style={{ backgroundColor: 'gray' }} justifyContent="center">
        {blogs.map((blog, index) => (
          <Grid key={index} item xs={12} lg={4} sm={4} padding={2}>
            <Link to={`/post/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
                className='cardgradient'
              >
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label={blog.avatarLabel}>{blog.avatarLabel}</Avatar>}
                  action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
                  title={blog.title}
                  subheader={blog.subheader}
                />
                {/* Use CardMedia to display the image */}
                <CardMedia
                  component="img"
                  alt={blog.title}
                  height="140" // Set the desired height
                  image={`https://api.arunarchitect.in/${blog.bimage}`}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {blog.subheader}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Blog;
