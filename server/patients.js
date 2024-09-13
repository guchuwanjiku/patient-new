import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Patients } from '../imports/api/patients';

Meteor.startup(() => {
  console.log('Server starting up...');

  // Check if admin user exists, if not create one
  const adminUser = Meteor.users.findOne({ username: 'admin' });
  if (!adminUser) {
    console.log('Creating admin user...');
    const adminId = Accounts.createUser({
      username: 'admin',
      email: 'admin@example.com',
      password: 'adminpassword',
    });
    Roles.addUsersToRoles(adminId, ['admin', 'medical_staff']);
    console.log('Admin user created with ID:', adminId);
  }

  // Create some sample patients if the database is empty
  if (Patients.find().count() === 0) {
    console.log('Creating sample patients...');
    const samplePatients = [
      { firstName: 'John', lastName: 'Doe', roomNumber: '101' },
      { firstName: 'Jane', lastName: 'Smith', roomNumber: '102' },
      { firstName: 'Bob', lastName: 'Johnson', roomNumber: '103' },
    ];

    samplePatients.forEach(patient => {
      const patientId = Patients.insert(patient);
      console.log(`Patient created: ${patient.firstName} ${patient.lastName} (ID: ${patientId})`);
    });
  }

  console.log('Total patients in database:', Patients.find().count());
});

// Log all method calls
const originalMeteorCall = Meteor.call;
Meteor.call = function(name, ...args) {
  console.log(`Method called: ${name}`, args);
  return originalMeteorCall.apply(this, [name, ...args]);
};

// Log all publication subscriptions
Meteor.onConnection((connection) => {
  connection.onClose(() => {
    console.log(`Connection ${connection.id} closed`);
  });
});

Meteor.publish(null, function() {
  console.log(`New connection: ${this.connection.id}`);
  return null;
});