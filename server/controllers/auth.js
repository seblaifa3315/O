const User = require("../models/User");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

exports.registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    if(emailExists) {
        res.status(400);
        throw new Error("A user with that email already exists");
    }

    const userExists = await User.findOne({ name });
    if(userExists) {
        res.status(400);
        throw new Error("A user with that username already exists");
    }

    const user = await User.create({ name, email, password });

    if (user) {
        await Profile.create({ userId: user._id, name });

        const token = generateToken(user._id);
        const secondsInWeek = 604800;

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: secondsInWeek * 1000,
        });

        res.status(201).json({
            success: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        });
    } else {
        res.status(400);
        throw new error("Invalid user data");
    }
});

exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && user.matchPassword(password)) {
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
                    name: user.name,
                    email: user.email
                },
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
                name: user.name,
                email: user.email,
            },
            profile,
        },
    });
});

exports.logoutUser = asyncHandler(async (req, res, next) => {
    res.clearCookie("token");
  
    res.send("You have successfully logged out");
  });