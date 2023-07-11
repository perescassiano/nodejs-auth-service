const express = require('express');

const {
    signUpController,
    signInController,
    resetPasswordRequestController,
    resetPasswordController,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/auth/login", signInController);

router.post("/auth/signup", signUpController);

router.post("/auth/requestResetPassword", resetPasswordRequestController);

router.post("/auth/resetPassword", resetPasswordController);

module.exports = router;