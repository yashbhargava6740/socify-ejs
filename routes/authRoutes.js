const express=require('express');
const passport = require('passport');
const { registerUser, registerGet, loginUser, loginGet } = require('../controllers/authControllers');
const router=express.Router() 
router.get('/register',registerGet);
router.post('/register',registerUser);
router.get('/login',loginGet);
router.post('/login',
    passport.authenticate('local',
    {
        failureRedirect: '/login'
    }),
    loginUser
);
router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }

      res.redirect('/login');
    });
});
module.exports=router;