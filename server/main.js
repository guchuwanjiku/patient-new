
// File: server/main.js
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import '../imports/api/patients';

Meteor.startup(async () => {
  // Create default users if the database is empty
  const userCount = await Meteor.users.find().countAsync();
  console.log(`User count at startup: ${userCount}`);

  if (userCount === 0) {
    const users = [
      { username: 'doctor1', password: 'password1', roles: ['medical_staff'] },
      { username: 'nurse1', password: 'password2', roles: ['medical_staff'] },
      { username: 'admin', password: 'adminpassword', roles: ['admin'] }
    ];

    for (const user of users) {
      try {
        const userId = Accounts.createUser({
          username: user.username,
          password: user.password
        });
        Roles.addUsersToRoles(userId, user.roles);
        console.log(`Created user: ${user.username}`);
      } catch (error) {
        console.error(`Error creating user ${user.username}:`, error);
      }
    }

    console.log(`User count after creation: ${await Meteor.users.find().countAsync()}`);
  }
});

// Handle new user creation
Accounts.onCreateUser((options, user) => {
  console.log('Creating new user:', user.username);
  if (options.role) {
    user.roles = [options.role];
  }
  return user;
});

// Add a login hook for debugging
Accounts.validateLoginAttempt((attemptInfo) => {
  console.log('Login attempt:', attemptInfo.user?.username, attemptInfo.allowed);
  return attemptInfo.allowed;
});