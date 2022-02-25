const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  telephone: {
    type: String,
    default: "",
  },
  birthday: {
    type: Date,
    default: null
  },
  photo: {
    type: String,
    default: "",
  },
  department: {
      type: String,
      enum: ["aquatics", "carpentry", "rigging", "lighting", "audio", "automation"]
  },
  status: {
    type: String,
    enum: ["supervisor", "lead", "lean"]
  },
  shift: {
    type: String,
    enum: ["day", "night"]
  }
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
