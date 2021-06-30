'use strict';

const express = require('express');
const morgan = require("morgan");
const passport = require('passport');
const passportLocal = require('passport-local');
const session = require('express-session'); // session middleware

const userDao = require('./user-dao');
const dao = require("./dao"); // module for accessing the DB


// init express
const app = new express();
app.use(morgan("dev"));
app.use(express.json()); 
const port = 3001;

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});