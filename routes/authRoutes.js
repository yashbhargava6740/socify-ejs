const express=require('express');
const User=require('../models/User');
const passport = require('passport');

const router=express.Router() 
router.get('/register',(req,res)=>{
    res.render('auth/signup');
});

router.post('/register',async (req,res)=>{
    let {gender,size,age,address,username,password}=req.body;
    let newuser=new User({gender,size,age,address,username});
    let nayabnada = await User.register(newuser,password);
    req.login(newuser,function(err){
        if(err){
            return next(err)
        }
        return res.redirect('/login');
    });
});

router.get('/login',(req,res)=>{
    res.render('auth/login');
})

router.post('/login',
    passport.authenticate('local',
    {
        failureRedirect: '/login'
    }),
    (req,res)=>{
        res.redirect('/');
    }
);
router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }

      res.redirect('/login');
    });
  });
module.exports=router;