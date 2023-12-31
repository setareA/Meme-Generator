"use strict";

const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const passportLocal = require("passport-local");
const session = require("express-session"); // session middleware

const userDao = require("./dao/userDao");
const memeDao = require("./dao/memeDao");
const imageDao = require("./dao/imageDao");

/**
 * for authentication part => https://github.com/polito-WA1-AW1-2021/wa1-week12
 */
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
    secret: "pink-panther",
    resave: false,
    saveUninitialized: false,
  })
);

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/images", isLoggedIn, (req, res) => {
  imageDao
    .getImages()
    .then((images) => {
      res.status(200).json(images);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.get("/api/images/:name", isLoggedIn, (req, res) => {
  imageDao
    .getImagebyName(req.params.name)
    .then((images) => {
      res.status(200).json(images[0]);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.get("/:imageName", (req, res) => {
  console.log("serving image");
  const name = req.params.imageName;
  res.sendFile(__dirname + "/images/" + name);
});

app.get("/api/memes/all", isLoggedIn, (req, res) => {
  console.log(req.user);
  console.log(req.user.type);
  if (req.user.type === "creator") {
    memeDao
      .getAllMemes()
      .then((allMemes) => {
        res.status(200).json(allMemes);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } else {
    res.status(403).json({ error: "not authorized" });
  }
});

app.get("/api/memes/:id", (req, res) => {
  const id = req.params.id;
  memeDao
    .getMeme(id)
    .then((meme) => {
      if (meme.visibility == "protected") {
        if (req.isAuthenticated() && req.user.type === "creator") {
          res.status(200).json(meme);
        } else {
          res.status(403).json({ error: "not authorized" });
        }
      } else {
        res.status(200).json(meme);
      }
    })
    .catch((err) => {
      if (err.error == "404") res.status(404).json("not found");
      else res.status(500).json(err);
    });
});
app.get("/api/publicMemes", (req, res) => {
  memeDao
    .getPublicMemes()
    .then((publicMemes) => {
      res.status(200).json(publicMemes);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.post("/api/memes", isLoggedIn, (req, res) => {
  const userId = req.user.id; //
  if (req.user.type === "creator") {
    imageDao
      .getImage(req.body.imgId)
      .then((image) => {
        if (image[0].numOfFields < req.body.field.length) {
          // not letting to add more texts than allowed
          res.status(500).json(error);
        } else {
          memeDao
            .addNewMeme(req.body, userId, image[0])
            .then((result) => {
              if (result == "error") {
                res
                  .status(500)
                  .json({ error: "positions not compatible with image" });
              } else res.status(200).json(result);
            })
            .catch((error) => {
              res.status(500).json(error);
            });
          //  res.status(200).json(image);
        }
      })
      .catch((error) => {
        if (err.error == "404") res.status(404).json("not found");
        res.status(500).json(error);
      });
  } else res.status(403).json({ error: "not authorized" });
});

app.post("/api/memes/copy/:id", isLoggedIn, (req, res) => {
  const userId = req.user.id;
  if (req.user.type === "creator") {
    memeDao
      .getMeme(req.params.id)
      .then((meme) => {
        const image = { imgAddr: meme.imgAddr, field: meme.field };
        req.body.imgAddr = meme.imgAddr; // make sure the image won't change
        if (meme.userId !== userId) {
          // the meme belongs to a different creator
          if (meme.visibility == "protected") {
            req.body.visibility = "protected";
          }
        }
        memeDao
          .addNewMeme(req.body, userId, image)
          .then((result) => {
            if (result == "error") {
              res
                .status(500)
                .json({ error: "positions not compatible with image" });
            } else res.status(200).json(result);
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      })
      .catch((error) => {
        if (err.error == "404") res.status(404).json("not found");
        else res.status(500).json(error);
      });
  } else res.status(403).json({ error: "not authorized" });
});
app.delete("/api/memes/:id", isLoggedIn, (req, res) => {
  const id = req.user.id;
  memeDao
    .getUserByMemeId(req.params.id)
    .then((userId) => {
      if (id === userId) {
        memeDao
          .deleteMeme(req.params.id)
          .then(() => {
            res.status(204).json();
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      } else {
        res.status(403).json({ error: "not authorized" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

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
