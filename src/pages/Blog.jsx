import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../styles/Dash.css';
import constructImage from '../images/construct.png';

const Blog = () => {
  const imageSource = constructImage

  // Tool data array
  const tools = [
    { title: 'Cost Analyzer', subheader: 'Analyze project costs', avatarLabel: 'C', route: '/blog' },
    { title: 'Advisory Engine', subheader: 'Get expert advice', avatarLabel: 'A', route: '/blog' },
    { title: 'Regulatory Compliance', subheader: 'Ensure compliance', avatarLabel: 'R', route: '/blog' },
    { title: 'Design Recommender', subheader: 'Optimize designs', avatarLabel: 'D', route: '/blog' },
    { title: 'Data Analysis Suite', subheader: 'Analytical insights', avatarLabel: 'D', route: '/blog' },
    { title: 'Project Evaluation', subheader: 'Evaluate project viability', avatarLabel: 'P', route: '/blog' },
  ];

  return (
    <Layout>
      <Grid container spacing={2} padding={3} style={{ backgroundColor: 'gray' }} justifyContent="center">
        {tools.map((tool, index) => (
          <Grid key={index} item xs={12} lg={4} sm={4} padding={2}>
            {/* Wrap the Card with a Link */}
            <Link to={tool.route} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                  avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label={tool.avatarLabel}>{tool.avatarLabel}</Avatar>}
                  action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
                  title={tool.title}
                  subheader={tool.subheader}
                />
                <CardMedia component="img" height="194" image={imageSource} alt={tool.title} />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {tool.subheader}
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
