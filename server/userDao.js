'use strict';
const db = require('./db');
const bcrypt = require('bcrypt');



exports.getUser = (username, password) => {
  
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user WHERE username = ?';
        db.get(sql, [username], (err, row) => {
            if (err)
                reject(err); // DB error
            else if (row === undefined)
                resolve(false); // user not found
            else {
                bcrypt.compare(password, row.password).then(result => {
                    if (result) // password matches
                        resolve({id: row.user_id, username: row.username, name:row.name});
                    else
                        resolve(false); // password not matching
                })
            }
        });
    });
};

exports.getUserById = (id) => {
    console.log("inside get user by id")
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE user_id = ?';
        db.get(sql, [id], (err, row) => {
          if (err) 
            reject(err);
          else if (row === undefined)
            resolve({error: 'User not found.'});
          else {
            const user = {id: row.user_id, username: row.username, name: row.name}
            resolve(user);
          }
      });
    });
  };
  
