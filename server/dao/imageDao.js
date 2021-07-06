"use strict";
const db = require("../db");

exports.getImages = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM image INNER JOIN image_text_field on image_text_field.imageId = image.id";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const result = convertResultSetToDomainModelImage(rows);
      resolve(result);
    });
  });
};

exports.getImage = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM image INNER JOIN image_text_field on image_text_field.imageId = image.id\
                                                                                WHERE image.id = ?";
    db.all(sql, [id], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      if (rows.length == 0 || rows == undefined) {
        reject({ error: "404" });
      } else {
        const result = convertResultSetToDomainModelImage(rows);
        resolve(result);
      }
    });
  });
};

const convertResultSetToDomainModelImage = (rows) => {
  const images = rows.map((e) => ({
    id: e.imageId,
    imgAddr: e.imageName,
    numOfFields: e.numOfFields,
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
  return result.filter((e) => e != null);
};
