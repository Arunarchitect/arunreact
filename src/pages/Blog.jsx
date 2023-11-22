import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Grid, Popover, MenuItem, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/Dash.css';

import { useGetResumeprofileQuery } from '../services/testApi';

const Blog = () => {
  const { data, isSuccess } = useGetResumeprofileQuery();
  const [blogs, setBlogs] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    // Handle edit logic for the selected blog (e.g., navigate to the edit page)
    console.log('Edit clicked for blog:', selectedBlog);
    handleClose();
  };

  const handleDeleteClick = () => {
    // Handle delete logic for the selected blog (e.g., show a confirmation dialog)
    console.log('Delete clicked for blog:', selectedBlog);
    handleClose();
  };

  useEffect(() => {
    if (isSuccess) {
      setBlogs(data.blogs);
    }
  }, [data, isSuccess]);

  return (
    <Layout>
      <Grid container spacing={2} padding={3} style={{ backgroundColor: 'gray' }} justifyContent="center">
        {blogs.map((blog, index) => (
          <Grid key={index} item xs={12} lg={4} sm={4} padding={2}>
            
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
                  action={
                    <div>
                      <IconButton aria-label="settings" onClick={(event) => { handleClick(event); setSelectedBlog(blog); }}>
                        <MoreVertIcon />
                      </IconButton>
                      <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <MenuItem onClick={handleEditClick}>
                          <EditIcon />
                          Edit
                        </MenuItem>
                        <MenuItem onClick={handleDeleteClick}>
                          <DeleteIcon />
                          Delete
                        </MenuItem>
                      </Popover>
                    </div>
                  }
                  title={
                    <Link to={`/post/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography variant="h7">{blog.title}</Typography>
                      <Typography variant="subtitle1" style={{ fontSize: '0.8em' }}>{blog.subtitle}</Typography>
                      
                    </Link>
                  }
                />
                <Link to={`/post/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <CardMedia
                    component="img"
                    alt={blog.title}
                    height="140" // Set the desired height
                    image={`https://api.arunarchitect.in/${blog.bimage}`}
                  />
                </Link>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {blog.subheader}
                  </Typography>
                </CardContent>
              </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Blog;
