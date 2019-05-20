const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
const db = require('./config/db').MongoURI;

//connecting to mongodb 
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Body-parser middleware - to send data as json to db
app.use(bodyParser.json());

//connect-flash middleware
app.use(flash());

//express-session middleware
app.use(session( {
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//passport-local middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

//importing routes
const userRoute = require('./routes/users');
const indexRoute = require('./routes/index');
const dashboardRoute = require('./routes/dashboard');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

//Routes middleware
app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/dashboard', dashboardRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);

//EJS views - for rendering dynamic webpages
app.use(expressLayouts);
app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//Server initialized
const PORT = process.env.PORT || 80;
app.listen(PORT, console.log(`Server started on port ${PORT}`));