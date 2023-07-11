require("express-async-errors");
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const session = require('express-session');
const cors = require('cors');

const connection = require("./config/config");
const authRoutes = require("./routes/auth.routes");

const app = express();

const port = process.env.PORT || 3000;

dotenv.config();

const limiter = rateLimit({
    windowMs: process.env.WINDOW_MS,
    max: process.env.MAX_REQUESTS,
    delayMs: process.env.DELAY_MS,
});

app.disable('x-powered-by');
app.set('trust proxy', 1)
app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

(async function db() {
    await connection();
})();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use("/api/v1", authRoutes);

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({ error: error.message });
});

app.listen(port, () => {
    console.log("Listening to Port ", port);
});

module.exports = app;
