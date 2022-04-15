const Profile = require("../models/Profile");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const multer = require('multer');


exports.updateProfile = asyncHandler(async (req, res, next) => {
    try {
        const userExists = await User.findOne({ _id: req.user.id });
        if (!userExists) return res.status(404).json({ message: "User doesn't exist" });

        const { city, country, month, day, year, phone, email } = req.body;
        

        const theProfile = await Profile.findOne({ userId: req.user.id });
        theProfile.city = city;
        theProfile.country = country;
        theProfile.birthMonth = month;
        theProfile.birthDay = day;
        theProfile.birthYear = year;
        theProfile.phone = phone;
        theProfile.email = email;

        await theProfile.save();

        return res.status(200).json(theProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
