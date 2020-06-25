if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express'),
    app = express(),
    expressLayouts = require('express-ejs-layouts'),
    indexRouter = require('./routes/index'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('./models/user');

app.set('view engine' , 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static('public'))

//DATABASE CONFIG
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose.'))

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Any secret is a good secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   next();
});
/* hello */
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)