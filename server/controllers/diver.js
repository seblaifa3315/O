const Diver = require("../models/Diver");
const Profile = require("../models/Profile");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.loadDivers = asyncHandler(async (req, res, next) => {
    try {
        const userExists = await User.findOne({ _id: req.user.id });
        if (!userExists) return res.status(404).json({ message: "User doesn't exist" });

        const allDivers = await Diver.find().lean();

        const allDiversWithPhoto = await Promise.all(
            allDivers.map(async (diver) => {
                const diverProfile = await Profile.findOne({ userId: diver.userId });
                diver.photo = diverProfile.photo;
                return diver;
            })
        );

        const sortedDivers = await allDiversWithPhoto.sort((a, b) => a.hiringDate - b.hiringDate);
        return res.status(200).json(sortedDivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

exports.loadTheDiver = asyncHandler(async (req, res, next) => {
    try {
        const userExists = await User.findOne({ _id: req.user.id });
        if (!userExists) return res.status(404).json({ message: "User doesn't exist" });

        const { diverId } = req.params;
        const theDiver = await Diver.findOne({ userId: diverId }).lean();

        const theDiverProfile = await Profile.findOne({ userId: diverId });
        const theDiverUser = await User.findOne({ _id: diverId });
        theDiver.photo = theDiverProfile.photo;
        theDiver.coverPicture = theDiverProfile.coverPicture;
        theDiver.city = theDiverProfile.city;
        theDiver.country = theDiverProfile.country;
        theDiver.birthMonth = theDiverProfile.birthMonth;
        theDiver.birthDay = theDiverProfile.birthDay;
        theDiver.birthYear = theDiverProfile.birthYear;
        theDiver.phone = theDiverProfile.phone;
        theDiver.email = theDiverProfile.email;
        theDiver.isAdmin = theDiverUser.isAdmin;

        return res.status(200).json(theDiver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

exports.updateDiver = asyncHandler(async (req, res, next) => {
    try {
        const userExists = await User.findOne({ _id: req.user.id });
        if (!userExists) return res.status(404).json({ message: "User doesn't exist" });

        const { firstName, lastName, status, shift, hiringDate, isAdmin, tracks, divingCert, gearCert, medicalCert, otherCert, diverId } = req.body;

        const theDiver = await Diver.findOne({ userId: diverId });

        theDiver.firstName = firstName;
        theDiver.lastName = lastName;
        theDiver.status = status;
        theDiver.shift = shift;
        theDiver.hiringDate = hiringDate;
        theDiver.tracks = tracks;
        theDiver.divingCert = divingCert;
        theDiver.gearCert = gearCert;
        theDiver.medicalCert = medicalCert;
        theDiver.otherCert = otherCert;
        await theDiver.save();

        const theUser = await User.findOne({ _id: diverId });
        theUser.isAdmin = isAdmin;
        await theUser.save();

        return res.status(200).json(theDiver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
