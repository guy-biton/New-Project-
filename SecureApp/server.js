// server.js
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const config = require('./config/config');
const db = require('./config/db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Debugging Crash
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('UNHANDLED REJECTION:', reason);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// Routes
const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);

const clientRoutes = require('./routes/clientRoutes');
app.use('/clients', clientRoutes);

// Inspector Route (For Demo Verification)
const inspectorController = require('./controllers/inspectorController');
app.get('/inspector', inspectorController.getInspector);

app.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    res.render('dashboard', { user: req.session.user });
});

// Start Server
// Start Server
const server = app.listen(3001, () => {
    console.log(`Server running on http://localhost:3001`);
});

server.on('error', (err) => {
    console.error('SERVER ERROR:', err);
});
