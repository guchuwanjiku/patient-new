import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import NavBar from './NavBar';

const Layout = () => {
  const user = useTracker(() => Meteor.user());
  const loggingIn = useTracker(() => Meteor.loggingIn());

  if (loggingIn) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;