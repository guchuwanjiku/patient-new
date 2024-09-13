import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Meteor } from 'meteor/meteor';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Meteor.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
      } else {
        navigate('/login');
      }
    });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Patient Monitoring
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Dashboard</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;