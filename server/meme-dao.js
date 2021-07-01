'use strict';
const db = require('./db');


exports.listMemes = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM meme";
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const tasks = rows.map((e) => ({
          id: e.id,
          imgAddr: e.img_addr,
          visibility: e.visibility,
          user_id: e.user_id,
          title: e.title,
          num_of_fields: e.num_of_fields,
        }));
        resolve(tasks);
      });
    });
  };