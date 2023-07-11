const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const dotenv = require('dotenv');

const bcryptSalt = process.env.BCRYPT_SALT;

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            unique: false,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
    this.password = hash;
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("user", userSchema);