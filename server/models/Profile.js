const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    firstName: {
      type: String,
      required: true,
      default: "",
    },
    lastName: {
      type: String,
      required: true,
      default: "",
    },
    photo: {
      type: String,
      default: "https://www.freevector.com/uploads/vector/preview/25719/Diver_Vector_6.jpg",
    },
    coverPicture: {
      type: String,
      default: "https://img1.10bestmedia.com/Images/Photos/229823/p-home-bg_55_660x440_201404241116.jpg",
    },
    city : {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    birthMonth: {
      type: String,
      default: "",
    },
    birthDay: {
      type: String,
      default: "",
    },
    birthYear: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Profile = mongoose.model("Profile", profileSchema);
