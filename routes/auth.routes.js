const express = require('express');

const {
    signUpController,
    signInController,
    resetPasswordRequestController,
    resetPasswordController,
} = require("../controllers/auth.controller");

const {
    validate,
    signUpValidationRules,
    signInValidationRules,
    resetPasswordRequestValidationRules,
    resetPasswordValidationRules,
} = require("../middlewares/validations.middleware");

const router = express.Router();

// Apply validation rules to the appropriate routes
router.post("/auth/login", validate(signInValidationRules), signInController);

router.post("/auth/signup", validate(signUpValidationRules), signUpController);

router.post("/auth/requestResetPassword", validate(resetPasswordRequestValidationRules), resetPasswordRequestController);

router.post("/auth/resetPassword", validate(resetPasswordValidationRules), resetPasswordController);

module.exports = router;