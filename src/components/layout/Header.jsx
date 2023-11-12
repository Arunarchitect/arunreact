import React,{useState} from 'react'
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography, Button } from '@mui/material'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, NavLink} from 'react-router-dom'
import '../../styles/Headerstyles.css';

const Header = () => {
  const [mobileOpen, setMobileOpen]= useState(false)

  // handlemenu click
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  //menu drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign:'center'}}>
      <Typography color={'goldenrod'} variant='h6' component={"div"} sx={{flexGrow:1, my:2}}>
            <FastfoodIcon />
              My modelflick
          </Typography>
          <Divider />
            <ul className='mobile-navigation'>
            <li>
              <Button component={NavLink} to={'/'} style={({ isActive }) => ({ color: isActive ? 'white' : 'black', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Home
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/about'} style={({ isActive }) => ({ color: isActive ? 'white' : 'black', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                About
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/menu'} style={({ isActive }) => ({ color: isActive ? 'white' : 'black', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Tools
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/contact'} style={({ isActive }) => ({ color: isActive ? 'white' : 'black', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Contact
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/test'} style={({ isActive }) => ({ color: isActive ? 'white' : 'black', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Test
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/login'} style={({ isActive }) => ({ color: isActive ? 'white' : 'black', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Login/Register
              </Button>
            </li>
            </ul>
    </Box>
  )
  return (
    <Box>
      <AppBar component={'nav'} sx={{bgcolor:'black'}}>
        <Toolbar>
          <IconButton  color='inherit' aria-label='open drawer' edge='start' sx={{mr: 2, display:{sm:'none'},}} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography color={'goldenrod'} variant='h6' component={"div"} sx={{flexGrow:1}}>
            <FastfoodIcon />
              My modelflick
          </Typography>
          <Box sx={{display:{xs:'none', sm:'block'}}}>
          <ul className='navigation-menu'>
            <li>
              <Button component={NavLink} to={'/'} style={({ isActive }) => ({ color: 'white', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Home
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/about'} style={({ isActive }) => ({ color: 'white', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                About
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/menu'} style={({ isActive }) => ({ color: 'white', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Tools
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/contact'} style={({ isActive }) => ({ color: 'white', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Contact
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/test'} style={({ isActive }) => ({ color: 'white', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Test
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/login'} style={({ isActive }) => ({ color: 'white', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Login/Register
              </Button>
            </li>
          </ul>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer variant='temporary' open={mobileOpen} onClose={handleDrawerToggle} sx={{display:{xs:'block', sm:'none'}, "& .MuiDrawer-paper":{boxSizing:"boreder-box", width:"240px"}}}>
          {drawer}
        </Drawer>
      </Box>
      <Box >
        <Toolbar />
      </Box>
    </Box>
  )
}

export default Header