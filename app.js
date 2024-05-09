const express = require('express');
const app = express();
const path = require('path')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override')
const LocalStrategy = require('passport-local');
const User = require('./models/User');
const dbConnect = require('./helpers/dbConnect');
if(dbConnect()) {
    console.log("Database connected");
} else {
    console.log("Database not connected");
};
require("dotenv").config();
//session
let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie :{
        httpOnly: true,
        expires: Date.now()+24*7*60*60*1000,
        maxAge: 24*7*60*60*1000

    }
}
app.use(session(configSession));
//authentication
passport.use(new LocalStrategy(User.authenticate()))
app.use(passport.initialize());
//safe storage-- session
app.use(passport.session());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    next();
});
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')))
//midddleware for routers
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(authRoutes);
app.use(postRoutes);
app.listen(process.env.PORT,()=>{
    console.log(`server connected at port at ${process.env.PORT}`)
});
app.use("/", (req,res) => {
    res.redirect("/register");
});