const { check, validationResult } = require("express-validator");

exports.validateRegister = [
    check("firstName", "Please enter a firstName").not().isEmpty(),
    check("lastName", "Please enter a lastName").not().isEmpty(),

    (req, res, next) => {
        const errors = validationResult(req);

        console.log(errors);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];

exports.validateLogin = [
    check("username", "username is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];
