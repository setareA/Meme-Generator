"use strict";
const db = require("../db");

exports.getAllMemes = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM meme INNER JOIN meme_sentence on meme.id = meme_sentence.memeId\
                                                    INNER JOIN user on meme.userId = user.id";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const allMemes = convertResultSetToDomainModelMemes(rows);
      resolve(allMemes);
    });
  });
};

exports.getMeme = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM meme INNER JOIN meme_sentence on meme.id = meme_sentence.memeId\
                                                INNER JOIN user on meme.userId = user.id\
                                                                           WHERE meme.id= ?";
    db.all(sql, [id], (error, rows) => {
      if (error) {
        reject({ error: "db error" });
        return;
      }
      if (rows.length == 0 || rows == undefined) {
        reject({ error: "404" });
      } else {
        const result = convertResultSetToDomainModelMemes(rows);
        const meme = result[0];
        resolve(meme);
      }
    });
  });
};

exports.getPublicMemes = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM meme INNER JOIN meme_sentence on meme.id = meme_sentence.memeId\
                                                INNER JOIN user on meme.userId = user.id\
                                                                        WHERE visibility = ?";
    db.all(sql, ["public"], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const result = convertResultSetToDomainModelMemes(rows);
      resolve(result);
    });
  });
};

exports.getUserByMemeId = (memeId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT userId FROM meme WHERE id = ?";
    db.get(sql, [memeId], (error, row) => {
      if (error) {
        reject({ error: "db error" });
      }
      if (row == undefined) {
        reject({ error: "meme not found." });
      } else {
        resolve(row.userId);
      }
    });
  });
};

exports.addNewMeme = (meme, userId, image) => {
  //meme.field: [{"pos": , "text": },{}]
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO meme(imageName,visibility,userId,title,numOfSentences,font,color)\
        VALUES (?, ? ,?, ?,?,?,?)";
    db.run(
      sql,
      [
        image.imgAddr,
        meme.visibility,
        userId,
        meme.title,
        meme.field.length,
        meme.font,
        meme.color,
      ],
      function (err) {
        if (err) {
          reject(err.message);
          return;
        }
        resolve(this.lastID);
      }
    );
  }).then((memeId) => {
    let promises = [];
    let i = 0;
    const allowedPos = image.field.map((f) => f.pos);
    while (i < meme.field.length) {
      if (allowedPos.includes(meme.field[i].pos)) {
        promises.push(
          new Promise((resolve, reject) => {
            const sql =
              "INSERT INTO meme_sentence(text,memeId,position)\
        VALUES (?, ? ,?)";
            db.run(
              sql,
              [meme.field[i].text, memeId, meme.field[i].pos],
              (err) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve();
              }
            );
          })
        );
      }
      i++;
    }
    if (promises.length == 0) return "error"; // no text was added because no position satisfied the positions of original image
    return Promise.all(promises)
      .then(() => {
        return this.getMeme(memeId);
      })
      .catch((error) => {
        return error;
      });
  });
};

exports.deleteMeme = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM meme WHERE id=?";
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
        return;
      } else resolve("ok");
    });
  });
};

const convertResultSetToDomainModelMemes = (rows) => {
  const memes = rows.map((e) => ({
    id: e.memeId,
    imgAddr: e.imageName,
    visibility: e.visibility,
    userId: e.userId,
    userName: e.username,
    userRealName: e.name,
    title: e.title,
    num_of_fields: e.numOfSentences,
    text: e.text,
    position: e.position,
    font: e.font,
    color: e.color,
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
  return result.filter((e) => e != null);
};
