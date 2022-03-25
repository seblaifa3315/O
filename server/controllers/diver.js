const Diver = require("../models/Diver");
const Profile = require("../models/Profile");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.loadDivers = asyncHandler(async (req, res, next) => {
    try{
        const userExists = await User.findOne({_id: req.user.id});
        if(!userExists) return res.status(404).json({message: "User doesn't exist"});

        const allDivers = await Diver.find().lean();

        const allDiversWithPhoto = await Promise.all(
            allDivers.map(async (diver) => {
                const diverProfile = await Profile.findOne({ userId: diver.userId});
                diver.photo = diverProfile.photo;
                return diver;
            })
        );

        const sortedDivers = await allDiversWithPhoto.sort((a,b) => a.hiringDate - b.hiringDate)
        return res.status(200).json(sortedDivers);

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});