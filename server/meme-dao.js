"use strict";
const db = require("./db");

exports.listMemes = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM meme INNER JOIN field on meme.id = field.memeId\
       INNER JOIN user on meme.user_id = user.user_id";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const result = convertResultSetToDomainModel(rows);
      resolve(result.filter((e) => e != null));
    });
  });
};

exports.listPublicMemes = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM meme INNER JOIN field on meme.id = field.memeId\
       INNER JOIN user on meme.user_id = user.user_id\
        WHERE visibility = ?";
    db.all(sql, ["public"], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const result = convertResultSetToDomainModel(rows);
      resolve(result.filter((e) => e != null));
    });
  });
};

exports.getMeme = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM meme INNER JOIN field on meme.id = field.memeId\
    INNER JOIN user on meme.user_id = user.user_id\
     WHERE id= ?";
    db.all(sql, [id], (error, rows) => {
      if (error) {
        reject({ error: "db error" });
        return;
      }
      if (rows.length == 0 || rows == undefined) {
        reject({ error: "meme not found.", code: 404 });
      } else {
        const result = convertResultSetToDomainModel(rows);
        const meme = result.filter((e) => e != null)[0];
        resolve(meme);
      }
    });
  });
};

const convertResultSetToDomainModel = (rows) => {
  const memes = rows.map((e) => ({
    id: e.id,
    imgAddr: e.img_addr,
    visibility: e.visibility,
    userId: e.user_id,
    userName: e.username,
    userRealName: e.name,
    title: e.title,
    num_of_fields: e.num_of_fields,
    text: e.text,
    position: e.position,
    field: [],
  }));

  const result = memes.reduce(function (r, meme) {
    r[meme.id] = r[meme.id] || {}; // if it's undefined set to {}
    if (Object.keys(r[meme.id]).length === 0) {
      r[meme.id] = meme;
      r[meme.id].field.push({ text: meme.text, pos: meme.position });
      delete r[meme.id].text;
      delete r[meme.id].position;
    } else {
      r[meme.id].field.push({ text: meme.text, pos: meme.position });
    }
    return r;
  }, []);
  return result;
};
