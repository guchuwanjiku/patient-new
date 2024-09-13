import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { TextField, Button, Grid2, Typography } from '@mui/material';

const UpdateVitalSigns = ({ patientId }) => {
  const [vitalSigns, setVitalSigns] = useState({
    heartRate: '',
    bloodPressure: { systolic: '', diastolic: '' },
    temperature: '',
    oxygenSaturation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setVitalSigns(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setVitalSigns(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call('patients.updateVitalSigns', patientId, {
      ...vitalSigns,
      heartRate: Number(vitalSigns.heartRate),
      bloodPressure: {
        systolic: Number(vitalSigns.bloodPressure.systolic),
        diastolic: Number(vitalSigns.bloodPressure.diastolic)
      },
      temperature: Number(vitalSigns.temperature),
      oxygenSaturation: Number(vitalSigns.oxygenSaturation)
    }, (error) => {
      if (error) {
        console.error('Error updating vital signs:', error);
      } else {
        setVitalSigns({
          heartRate: '',
          bloodPressure: { systolic: '', diastolic: '' },
          temperature: '',
          oxygenSaturation: ''
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>Update Vital Signs</Typography>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Heart Rate"
            name="heartRate"
            value={vitalSigns.heartRate}
            onChange={handleChange}
            type="number"
          />
        </Grid2>
        <Grid2 item xs={6} sm={3}>
          <TextField
            fullWidth
            label="Systolic BP"
            name="bloodPressure.systolic"
            value={vitalSigns.bloodPressure.systolic}
            onChange={handleChange}
            type="number"
          />
        </Grid2>
        <Grid2 item xs={6} sm={3}>
          <TextField
            fullWidth
            label="Diastolic BP"
            name="bloodPressure.diastolic"
            value={vitalSigns.bloodPressure.diastolic}
            onChange={handleChange}
            type="number"
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Temperature"
            name="temperature"
            value={vitalSigns.temperature}
            onChange={handleChange}
            type="number"
            step="0.1"
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Oxygen Saturation"
            name="oxygenSaturation"
            value={vitalSigns.oxygenSaturation}
            onChange={handleChange}
            type="number"
            step="0.1"
          />
        </Grid2>
      </Grid2>
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
        Update Vital Signs
      </Button>
    </form>
  );
};

export default UpdateVitalSigns;