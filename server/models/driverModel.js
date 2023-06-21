const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  
  Name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  Password: { type: String, required: true },
  dailySalary: { type: Number, default: 0 }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Driver', driverSchema);