const User = require("../models/User");
const Profile = require("../models/Profile");
const Diver = require("../models/Diver");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

exports.registerUser = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, status, isAdmin, shift, hiringDate } = req.body;
    const username= `${firstName[0].toLowerCase()}${lastName.toLowerCase()}`;
    const password = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;


    const userExists = await User.findOne({ username });
    
    if(userExists) {
        res.status(400);
        throw new Error("A user with that username already exists");
    }

    const user = await User.create({ firstName, lastName, username, password, isAdmin});

    if (user) {
        const profile = await Profile.create({ userId: user._id, firstName, lastName });
        const diver = await Diver.create({ userId: user._id, firstName, lastName, status, shift, hiringDate })

        res.status(201).json({
            success: {
                divers: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin,
                    status: diver.status,
                    shift: diver.shift,
                    hiringDate: diver.hiringDate,
                },
            }
        });
    } else {
        res.status(400);
        throw new error("Invalid user data");
    }
});

exports.loginUser = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && user.matchPassword(password)) {
        const profile = await Profile.findOne({ userId: user._id });
        const token = generateToken(user._id);
        const secondsInWeek = 604800;

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: secondsInWeek * 1000,
        })

        res.status(200).json({
            success: {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin,
                },
                profile,
            }
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
})

exports.loadUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const profile = await Profile.findOne({ userId: req.user.id });

    if (!user) {
        res.status(401);
        throw new Error("Not authorized");
    }

    res.status(200).json({
        success: {
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin,
            },
            profile,
        },
    });
});

exports.logoutUser = asyncHandler(async (req, res, next) => {
    res.clearCookie("token");
  
    res.send("You have successfully logged out");
  });