const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  target: {
    type: String,
    require: true,
  },
  customers: [String],
  upcoming: Boolean,
  success: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Launch", launchesSchema);
