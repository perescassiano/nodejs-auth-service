const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const DB_URL = process.env.MONGO_DB_URL;

module.exports = async function connection() {
    try {
        await mongoose.connect(
            DB_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                autoIndex: true,
            }
        );
    } catch (error) {
        console.log(error);
    }
};