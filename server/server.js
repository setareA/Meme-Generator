'use strict';

const express = require('express');
const morgan = require("morgan");
const passport = require('passport');
const passportLocal = require('passport-local');
const session = require('express-session'); // session middleware

const userDao = require('./user-dao');
const memeDao = require("./meme-dao"); 

passport.use(new passportLocal.Strategy((username, password, done) => {
  // verification callback for authentication
  userDao.getUser(username, password).then(user => {
    if (user)
      done(null, user);
    else
      done(null, false, { message: 'Username or password wrong' });
  }).catch(err => {
    done(err);
  });
}));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  console.log("serialize user");
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  console.log("deserialize user");
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});


// init express
const app = new express();
app.use(morgan("dev"));
app.use(express.json()); 
const port = 3001;

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
      return next();
  
    return res.status(401).json({ error: 'not authenticated' });
  }
  
  app.use(session({
    secret: 'twitty',
    resave: false,
    saveUninitialized: false
  }));
  
  // tell passport to use session cookies
  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/api/memes" ,/* isLoggedIn, */(req, res) => {
  
     memeDao
       .listMemes()
       .then((meme) => {
         res.status(200).json(meme);
       })
       .catch((error) => {
         res.status(500).json(error.message);
       });
   });
  

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});