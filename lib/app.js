const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const app = express();

// Body Parser  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Configs
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
})

//Headers
app.use(function (req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store');
  next();
});

// OAuth passport Google Strategy...

passport.use(new GoogleStrategy({
  clientID: '222534469043-19a28sb3jae9qkslnlk1jtlihia5mfqh.apps.googleusercontent.com',
  clientSecret: '8l_6jbJfkxFK-X1bSVsnonoQ',
  callbackURL: "http://localhost:2024/auth/google/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    return(
      console.log(profile)
    )
  }
));

// Root Route Config
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
app.use('/', require('./routes/paths'));

// Port Configs
const PORT = process.env.PORT || 2024;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
