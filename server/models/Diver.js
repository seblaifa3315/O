const mongoose = require("mongoose");

const diverSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
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
            default: "",
        },
        status: {
            type: String,
            enum: ["supervisor", "lead", "technician"],
        },
        shift: {
            type: String,
            enum: ["day", "night"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Diver = mongoose.model("Diver", diverSchema);
