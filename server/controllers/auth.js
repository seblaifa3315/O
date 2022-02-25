const User = require("../models/User");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

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
    console.log(req.body);

    const user = await User.findOne({ email });

    if (user && user.matchPassword(password)) {

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

exports.logoutUser = asyncHandler(async (req, res, next) => {
    res.clearCookie("token");
  
    res.send("You have successfully logged out");
  });