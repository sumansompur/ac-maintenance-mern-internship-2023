const mongoose = require("mongoose");

const appointSchema = new mongoose.Schema({
  client_username: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  serviceDate: {
    type: Date,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  active: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("appointment", appointSchema);
