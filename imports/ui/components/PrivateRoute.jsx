// File: imports/ui/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

const PrivateRoute = ({ children }) => {
  const user = useTracker(() => Meteor.user());
  const loading = useTracker(() => Meteor.loggingIn());

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;