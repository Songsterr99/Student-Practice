const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/usersdb";
const { createHash } = require('crypto');


mongoose.Promise = global.Promise;
mongoose.connect(url);

const bcrypt = require('bcryptjs');


passport.use(new LocalStrategy(((username, password, done) => {
  User.findOne({login: username}, (err, user)=>{
    console.log(user);
    if(err){
      done(err);
    }
    if(!user){
      done(null, false);
    }
    else{
      const passwordHash = createHash('sha512').update(password).digest('hex');
      if(user.password === passwordHash){
        done(null, user);
      }
      else{
        done(null, false);
      }
    }
  });
})));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;