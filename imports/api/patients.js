import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';


export const Patients = new Mongo.Collection('patients');

Meteor.methods({
  'patients.count'() {
    console.log('patients.count method called. User ID:', this.userId);
    if (!this.userId || !Roles.userIsInRole(this.userId, ['medical_staff', 'admin'])) {
      console.log('Unauthorized access attempt to patients.count');
      throw new Meteor.Error('not-authorized');
    }
    const count = Patients.find().count();
    console.log('Total patients count:', count);
    return count;
  },
  
  'patients.addNote'(patientId, noteContent) {
    check(patientId, String);
    check(noteContent, String);
    console.log('patients.addNote method called. User ID:', this.userId, 'Patient ID:', patientId);

    if (!this.userId || !Roles.userIsInRole(this.userId, ['medical_staff', 'admin'])) {
      console.log('Unauthorized access attempt to patients.addNote');
      throw new Meteor.Error('not-authorized');
    }

    try {
      Patients.update(patientId, {
        $push: {
          notes: {
            content: noteContent,
            createdAt: new Date(),
            createdBy: this.userId
          }
        }
      });
      console.log('Note added successfully');
    } catch (error) {
      console.error('Error adding note:', error);
      throw new Meteor.Error('failed-to-add-note', 'Failed to add note to patient record');
    }
  },
  
  'patients.updateVitalSigns'(patientId, vitalSigns) {
    check(patientId, String);
    check(vitalSigns, {
      heartRate: Number,
      bloodPressure: {
        systolic: Number,
        diastolic: Number
      },
      temperature: Number,
      oxygenSaturation: Number
    });
    console.log('patients.updateVitalSigns method called. User ID:', this.userId, 'Patient ID:', patientId);

    if (!this.userId || !Roles.userIsInRole(this.userId, ['medical_staff', 'admin'])) {
      console.log('Unauthorized access attempt to patients.updateVitalSigns');
      throw new Meteor.Error('not-authorized');
    }

    try {
      Patients.update(patientId, {
        $push: {
          vitalSigns: {
            ...vitalSigns,
            timestamp: new Date()
          }
        }
      });
      console.log('Vital signs updated successfully');
    } catch (error) {
      console.error('Error updating vital signs:', error);
      throw new Meteor.Error('failed-to-update-vital-signs', 'Failed to update patient vital signs');
    }
  }
});