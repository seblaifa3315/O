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
  },
  {
    timestamps: true,
  }
);

module.exports = Profile = mongoose.model("Profile", profileSchema);
