import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout'
import { Box, Typography, TableContainer, Table, Paper, Avatar,  TableCell, TableHead, TableBody, TableRow, TextField} from '@mui/material'
import {useGetResumeprofileQuery} from '../services/testApi'

const Menu = () => {
  const {data, isSuccess} = useGetResumeprofileQuery()
  const [candidates, setCandidates] = useState([])

  useEffect(()=>{
    if(data && isSuccess){
      setCandidates(data.candidates)
    }
  },[data, isSuccess])

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
            padding: '200px'
            
          },
          "@media (max-width:600px)":{
            mt:0,
          }
,        }}>
          <Typography variant='h4'>
            Tools
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">D.O.B</TableCell>
                  <TableCell align='center' >Kerala</TableCell>
                  <TableCell align='center' >Gender </TableCell>
                  <TableCell align='center' >Location </TableCell>
                  <TableCell align='center' >Image</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidates.map((candidate, i) => {
                  return (
                    <TableRow key={i} sx={{ '&:last-child td, &last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">{candidate.name}</TableCell>
                      <TableCell align='center'>{candidate.email}</TableCell>
                      <TableCell align='center'>{candidate.dob}</TableCell>
                      <TableCell align='center'>{candidate.state}</TableCell>
                      <TableCell align='center'>{candidate.gender}</TableCell>
                      <TableCell align='center'>{candidate.location}</TableCell>
                      <TableCell align='center'>
                        <Avatar src={`https://api.arunarchitect.in/${candidate.pimage}`} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
    </Layout>
  )
}

export default Menu