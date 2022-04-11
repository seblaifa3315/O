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
        status: {
        type: String,
            enum: ["supervisor", "lead", "technician"],
        },
        shift: {
            type: String,
            enum: ["day", "night"],
        },
        hiringDate: {
            type: Date,
        },
        divingCert: {
            type: [String],
            default: ["Dive Master"],
        },
        gearCert: {
            type: [String],
            default: [],
        },
        medicalCert: {
            type: [String],
            default: [],
        },
        otherCert: {
            type: [String],
            default: [],
        },
        tracks: {
            type: [String],
            default: [],
        },

    },
    {
        timestamps: true,
    }
);

module.exports = Diver = mongoose.model("Diver", diverSchema);
