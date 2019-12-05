const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
  title: {
    type: String,
    isRequired: true
  },
  email: {
    type: String,
    isRequired: true
  },
  start: {
    type: Date,
    isRequired: true
  },
  end: {
    type: Date,
    isRequired: true
  },
  number: {
    type: String,
    isRequired: true
  },
  name: {
    type: String,
    isRequired: true
  }
});

const Appointment = (module.exports = mongoose.model(
  "Appointment",
  AppointmentSchema
));
