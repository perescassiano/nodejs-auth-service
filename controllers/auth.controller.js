const {
    signup,
    signin,
    requestPasswordReset,
    resetPassword,
  } = require("../services/auth.service");
  
  const signUpController = async (req, res, next) => {
    const signupService = await signup(req.body);
    return res.json(signupService);
  };

  const signInController = async (req, res, next) => {
    const signinService = await signin(req.body);
    return res.json(signinService);
  };
  
  const resetPasswordRequestController = async (req, res, next) => {
    const requestPasswordResetService = await requestPasswordReset(
      req.body
    );
    return res.json(requestPasswordResetService);
  };
  
  const resetPasswordController = async (req, res, next) => {
    const resetPasswordService = await resetPassword(req.body );
    return res.json(resetPasswordService);
  };
  
  module.exports = {
    signUpController,
    resetPasswordRequestController,
    resetPasswordController,
    signInController
  };