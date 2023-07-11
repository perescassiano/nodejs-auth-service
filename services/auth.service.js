const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const User = require("../models/user.model");
const Token = require("../models/token.model");
const crypto = require("crypto");

const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT;

const signin = async (data) => {

  const { email, password } = data;
  
  const user = await User.findOne({ email: email });

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const isEqual = bcrypt.compare(password, user.password);
  if (!isEqual) {
    const error = new Error('Wrong password');
    error.statusCode = 401;
    throw error;
  }

  const token = JWT.sign({
    email: user.email,
    userId: user._id.toString()
  },
    JWTSecret,
    { expiresIn: '1h' }
  );
  return (data = { token: token, userId: user._id.toString() });
}

const signup = async (data) => {

  let user = await User.findOne({ email: data.email });
  if (user) {
    throw new Error("Email already exists");
  }
  const hashedPassword = await bcrypt.hash(data.password, 12);
  user = new User({
    email: data.email,
    password: hashedPassword,
    name: data.name
  });
  const token = JWT.sign({ id: user._id }, JWTSecret);
  await user.save();
  return (data = {
    userId: user._id,
    email: user.email,
    name: user.name,
    token: token,
  });
};

const requestPasswordReset = async (data) => {

  const email = data.email;

  const user = await User.findOne({ email });
  if (!user) throw new Error("Email does not exists");

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  // Call email microservice
  
  return {"token": resetToken};
};

const resetPassword = async (data) => {

  const errors = validationResult(data);

  if (!errors) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
  }

  const userId = data.userId;
  const password = data.password;
  const token = data.token;

  let passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    throw new Error("No token passed");
  }

  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }

  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await User.findById({ _id: userId });
  
  // Call email microservice
  await passwordResetToken.deleteOne();

  return { message: "Password reset was successful" };
};

module.exports = {
  signup,
  signin,
  requestPasswordReset,
  resetPassword,
};