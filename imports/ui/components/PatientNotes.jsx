import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Patients } from '../../api/patients';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const PatientNotes = ({ patientId }) => {
  const { notes, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('patientNotes', patientId);
    const patient = Patients.findOne(patientId);
    return {
      notes: patient ? patient.notes : [],
      isLoading: !handle.ready(),
    };
  });

  if (isLoading) {
    return <div>Loading notes...</div>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Patient Notes</Typography>
      <List>
        {notes.map((note, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={note.content}
              secondary={`${new Date(note.createdAt).toLocaleString()} - ${note.createdBy}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PatientNotes;