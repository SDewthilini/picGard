const express = require('express');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your allowed origin
    credentials: true, // Allow credentials (cookies) to be sent
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));

connectDB();

// Routes
app.get('*', checkUser);
app.use(authRoutes);
app.use(fileRoutes);

// Cookie handling
app.get('/set-cookies', (req, res) => {
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, { maxAge: 1000 * 10, httpOnly: true });

    res.send('You got the cookies!');
});

app.get('/read-cookies', (req, res) => {
    const cookies = req.cookies;

    res.json(cookies);
});

app.listen(port, () => {
    console.log('Server is running on port 4000');
});
