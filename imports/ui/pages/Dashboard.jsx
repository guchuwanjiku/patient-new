import React, { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Patients } from '../../api/patients';
import PatientList from '../components/PatientList';
import { Container, Typography, Box, CircularProgress } from '@mui/material';

const Dashboard = () => {
  const { patients, isLoading, subscriptionReady } = useTracker(() => {
    const subscription = Meteor.subscribe('patients');
    const patients = Patients.find({}).fetch();
    console.log('Subscription ready:', subscription.ready());
    console.log('Patients found:', patients.length);
    return {
      patients,
      isLoading: !subscription.ready(),
      subscriptionReady: subscription.ready(),
    };
  }, []);

  useEffect(() => {
    console.log('Dashboard re-rendered. Patients:', patients.length);
  }, [patients]);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Patient Monitoring Dashboard
        </Typography>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 2 }}>Loading patients...</Typography>
          </Box>
        ) : patients.length > 0 ? (
          <PatientList patients={patients} />
        ) : (
          <Box>
            <Typography variant="body1">No patients found.</Typography>
            <Typography variant="body2">Subscription ready: {subscriptionReady ? 'Yes' : 'No'}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;