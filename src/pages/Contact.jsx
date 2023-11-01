import React from 'react'
import Layout from '../components/layout/Layout'
import { Box, Typography } from '@mui/material'

const Contact = () => {
  return (
    <Layout>
        <Box sx={{
          my:5,
          textAlign:"center",
          p:2,
          "& h4":{
            fontWeight:'bold',
            my:'2',
            fontSize:'2rem',
          },
          "& p":{
            textAlign:'justify',
            padding: '50px'
            
          },
          "@media (max-width:600px)":{
            mt:0,
          }
,        }}>
          <Typography variant='h4'>
            Contact Modelflick
          </Typography>
          <p>
          This website is operated by Modelflick. Throughout the site, the terms "we," "us," and "our" refer to Modelflick. Modelflick offers architectural and interior design services in compliance with The Architects Act, 1972, of the Government of India. By using our services, you agree to be bound by the following terms and conditions ("Terms of Service," "Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are clients, visitors, or contributors of content.


          </p>
          <br />
          <p>
          Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.

          Any updates or modifications to our services or policies will also be subject to these Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change, or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
          </p>
        </Box>
    </Layout>
  )
}

export default Contact