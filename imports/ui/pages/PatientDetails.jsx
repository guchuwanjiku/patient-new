import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Patients } from '../../api/patients';
import { Container, Typography, TextField, Button, Box, Grid2 } from '@mui/material';
import VitalSignsChart from '../components/VitalSignsChart';
import PatientNotes from '../components/PatientNotes';
import UpdateVitalSigns from '../components/UpdateVitalSigns';

const PatientDetails = () => {
  const { id } = useParams();
  const [note, setNote] = useState('');

  const { patient, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('patient', id);
    return {
      patient: Patients.findOne(id),
      isLoading: !handle.ready(),
    };
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleAddNote = () => {
    Meteor.call('patients.addNote', id, note, (error) => {
      if (error) {
        console.error('Error adding note:', error);
      } else {
        setNote('');
      }
    });
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          {patient.firstName} {patient.lastName}
        </Typography>
        <Typography variant="subtitle1">Room: {patient.roomNumber}</Typography>
        
        <Grid2 container spacing={4}>
          <Grid2 item xs={12} md={6}>
            <Box sx={{ my: 4 }}>
              <VitalSignsChart patientId={id} />
            </Box>
          </Grid2>
          <Grid2 item xs={12} md={6}>
            <Box sx={{ my: 4 }}>
              <UpdateVitalSigns patientId={id} />
            </Box>
          </Grid2>
        </Grid2>

        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom>Add Note</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={handleAddNote} sx={{ mt: 2 }}>
            Add Note
          </Button>
        </Box>

        <Box sx={{ my: 4 }}>
          <PatientNotes patientId={id} />
        </Box>
      </Box>
    </Container>
  );
};

export default PatientDetails;