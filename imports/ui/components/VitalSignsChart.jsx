import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Patients } from '../../api/patients';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Box } from '@mui/material';

const VitalSignsChart = ({ patientId }) => {
  const { vitalSigns, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('patientVitalSigns', patientId);
    const patient = Patients.findOne(patientId);
    return {
      vitalSigns: patient ? patient.vitalSigns : [],
      isLoading: !handle.ready(),
    };
  });

  if (isLoading) {
    return <div>Loading vital signs...</div>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Vital Signs</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={vitalSigns}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="heartRate" stroke="#8884d8" name="Heart Rate" />
          <Line yAxisId="right" type="monotone" dataKey="bloodPressure.systolic" stroke="#82ca9d" name="Systolic BP" />
          <Line yAxisId="right" type="monotone" dataKey="bloodPressure.diastolic" stroke="#ffc658" name="Diastolic BP" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default VitalSignsChart;