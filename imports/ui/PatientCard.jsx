import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Meteor } from 'meteor/meteor';

const UpdateStatus = ({ patient }) => {
  const [status, setStatus] = useState(patient.status);
  const [note, setNote] = useState('');

  const updatePatientStatus = () => {
    Meteor.call('patients.updateStatus', patient._id, status, note);
  };

  return (
    <div>
      <TextField
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <TextField
        label="Add Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <Button onClick={updatePatientStatus}>Update</Button>
    </div>
  );
};

const PatientCard = ({ patient }) => (
  <Card>
    <CardContent>
      <Typography variant="h5">{patient.name}</Typography>
      <Typography>Heart Rate: {patient.vitals.heartRate} bpm</Typography>
      <Typography>Blood Pressure: {patient.vitals.bloodPressure}</Typography>
      <Typography>Temperature: {patient.vitals.temperature} °F</Typography>
      <Typography>Status: {patient.status}</Typography>
      <Typography>Notes: {patient.notes.join(', ')}</Typography>

      {/* Add status update functionality */}
      <UpdateStatus patient={patient} />
    </CardContent>
  </Card>
);
