import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import PropTypes from 'prop-types';

const PatientList = ({ patients }) => {
  return (
    <Box>
      <List>
        {patients.map(patient => (
          <React.Fragment key={patient._id}>
            <ListItem>
              <ListItemText
                primary={`${patient.firstName} ${patient.lastName}`}
                secondary={`Room Number: ${patient.roomNumber}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      {patients.length === 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            No patient data available.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

PatientList.propTypes = {
  patients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      roomNumber: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PatientList;