"use strict";
const db = require("../db");
const bcrypt = require("bcrypt");

exports.getUser = (username, password) => {
  console.log("calling getUser");
  console.log(username);
  console.log(password);
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE username = ?";
    db.get(sql, [username], (err, row) => {
      if (err) reject(err);
      // DB error
      else if (row === undefined) resolve(false);
      // user not found
      else {
        console.log("found the user");
        bcrypt.compare(password, row.password).then((result) => {
          if (result) {
            // password matches
            console.log("password matches");
            resolve({
              id: row.id,
              username: row.username,
              name: row.name,
              type: row.type,
            });
          } else resolve(false); // password not matching
        });
      }
    });
  });
};

exports.getUserById = (id) => {
  console.log("inside get user by id");
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) resolve({ error: "User not found." });
      else {
        const user = {
          id: row.id,
          username: row.username,
          name: row.name,
          type: row.type,
        };
        resolve(user);
      }
    });
  });
};
