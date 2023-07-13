const { body, validationResult } = require('express-validator');

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json({ errors: errorMessages });
    };
};

const signUpValidationRules = [
    body('email')
        .isEmail()
        .not()
        .isEmpty()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),
    body('password').trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)
        .withMessage('Password must contain at least one special character and one number')
        .not()
        .isEmpty()
        .withMessage('Password field must be provided'),
    body('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter a valid name')
];

const signInValidationRules = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .not()
        .isEmpty()
        .withMessage('Email field must be provided'),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password field must be provided'),
];

const resetPasswordRequestValidationRules = [
    body('email')
        .isEmail()
        .not()
        .isEmpty()
        .withMessage('Email field must be provided'),
];

const resetPasswordValidationRules = [
    body('password').trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)
    .withMessage('Password must contain at least one special character and one number')
    .not()
    .isEmpty()
    .withMessage('Password field must be provided'),
];

module.exports = {
    validate,
    signUpValidationRules,
    signInValidationRules,
    resetPasswordRequestValidationRules,
    resetPasswordValidationRules,
};