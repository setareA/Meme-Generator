"use strict";
const db = require("./db");

exports.listMemes = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM meme INNER JOIN meme_text on meme.id = meme_text.memeId\
       INNER JOIN user on meme.user_id = user.user_id";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const result = convertResultSetToDomainModelMemes(rows);
      resolve(result.filter((e) => e != null));
    });
  });
};

exports.listPublicMemes = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM meme INNER JOIN meme_text on meme.id = meme_text.memeId\
       INNER JOIN user on meme.user_id = user.user_id\
        WHERE visibility = ?";
    db.all(sql, ["public"], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const result = convertResultSetToDomainModelMemes(rows);
      resolve(result.filter((e) => e != null));
    });
  });
};

exports.getMeme = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM meme INNER JOIN meme_text on meme.id = meme_text.memeId\
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
        const result = convertResultSetToDomainModelMemes(rows);
        const meme = result.filter((e) => e != null)[0];
        resolve(meme);
      }
    });
  });
};

exports.getUserByMemeId = (memeId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT user_id FROM meme WHERE id = ?";
    db.get(sql, [memeId], (error, row) => {
      if (error) {
        reject({ error: "db error" });
      }
      if (row == undefined) {
        reject({ error: "meme not found." });
      } else {
        resolve(row.user_id);
      }
    });
  });
};

exports.listImages = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM image INNER JOIN image_field on image.image_id = image_field.image_id";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const result = convertResultSetToDomainModelImage(rows);
      resolve(result.filter((e) => e != null));
    });
  });
};

exports.createMeme = (meme, userId) => {
  //meme.field: [{"pos": , "text": },{}]
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO meme(img_addr,visibility,user_id,title,num_of_fields)\
        VALUES (?, ? ,?, ?,?)";
    db.run(
      sql,
      [meme.imgAddr, meme.visibility, userId, meme.title, meme.numOfFields],
      function (err) {
        if (err) {
          reject(err.message);
          return;
        }
        resolve(this.lastID);
      }
    );
  })
    .then((memeId) => {
      let promises = [];
      let i = 0;
      while (i < meme.field.length) {
        const promise = new Promise((resolve, reject) => {
          const sql =
            "INSERT INTO meme_text(text,memeId,position)\
        VALUES (?, ? ,?)";
          db.run(
            sql,
            [meme.field[i].text, memeId, meme.field[i].pos],
            (err) => {
              if (err) {
                reject(err);
                return;
              }
              return;
            }
          );
        });
        promises.push(promise);
        i++;
      }
      Promise.all(promises)
        .then(() => resolve())
        .catch((error) => reject(error));
    })
    .catch((error) => reject(error));
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

const convertResultSetToDomainModelImage = (rows) => {
  const images = rows.map((e) => ({
    id: e.image_id,
    imgAddr: e.img_addr,
    position: e.position,
    field: [],
  }));

  const result = images.reduce(function (r, image) {
    r[image.id] = r[image.id] || {}; // if it's undefined set to {}
    if (Object.keys(r[image.id]).length === 0) {
      r[image.id] = image;
      r[image.id].field.push({ pos: image.position });
      delete r[image.id].position;
    } else {
      r[image.id].field.push({ pos: image.position });
    }
    return r;
  }, []);
  return result;
};
