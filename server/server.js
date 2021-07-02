"use strict";

const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const passportLocal = require("passport-local");
const session = require("express-session"); // session middleware

const userDao = require("./user-dao");
const memeDao = require("./meme-dao");

passport.use(
  new passportLocal.Strategy((username, password, done) => {
    // verification callback for authentication
    userDao
      .getUser(username, password)
      .then((user) => {
        if (user) done(null, user);
        else done(null, false, { message: "Username or password wrong" });
      })
      .catch((err) => {
        done(err);
      });
  })
);

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  console.log("serialize user");
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  console.log("deserialize user");
  userDao
    .getUserById(id)
    .then((user) => {
      done(null, user); // this will be available in req.user
    })
    .catch((err) => {
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
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: "not authenticated" });
};

app.use(
  session({
    secret: "twitty",
    resave: false,
    saveUninitialized: false,
  })
);

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/api/memes",
  /* isLoggedIn, */ (req, res) => {
    /*
     * TODO:  check logged in and creator type
     */
    memeDao
      .listMemes()
      .then((memes) => {
        res.status(200).json(memes);
      })
      .catch((error) => {
        res.status(500).json(error.message);
      });
  }
);

app.get("/api/memes/public", (req, res) => {
  memeDao
    .listPublicMemes()
    .then((memes) => {
      res.status(200).json(memes);
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
});

app.get(
  "/api/memes/:id",
  /* isLoggedIn ,*/ (req, res) => {
    const id = req.params.id;
    memeDao
      .getMeme(id)
      .then((meme) => {
        if (meme.visibility == "protected") {
          /*
          * check isloggedin , and creator type
          if ok resolve meme o.w reject
          */
        }
        res.status(200).json(meme);
      })
      .catch((error) => {
        if (error.code && error.code == 404) res.status(404).json(error);
        else res.status(500).json(error);
      });
  }
);

app.get(
  "/api/images",
  /* isLoggedIn, */ (req, res) => {
    /*
     * TODO:  check logged in
     */
    memeDao
      .listMemes()
      .then((memes) => {
        res.status(200).json(memes);
      })
      .catch((error) => {
        res.status(500).json(error.message);
      });
  }
);

app.delete(
  "/api/memes/:id",
  /* isLoggedIn,*/ (req, res) => {
    //  todo: check if logged in
    memeDao
      .getUserByMemeId(req.params.id)
      .then((userId) => {
        // todo: check if userId is the req.user.id o.w: 401
        memeDao
          .deleteMeme(req.params.id)
          .then(() => {
            res.status(204).json();
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
);

// login
app.post("/api/sessions", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

// DELETE /sessions/current
// logout
app.delete("/api/sessions/current", isLoggedIn, (req, res) => {
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get("/api/sessions/current", isLoggedIn, (req, res) => {
  console.log(req.user);
  res.status(200).json(req.user);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
