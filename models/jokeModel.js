const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/jokebook.db'); 

exports.getCategories = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT DISTINCT category FROM jokes`;
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows.map(row => row.category));
    });
  });
};

exports.getByCategory = (category, limit) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM jokes WHERE category = ?`;
    const params = [category];

    if (limit) {
      sql += ` LIMIT ?`;
      params.push(Number(limit));
    }

    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.getRandom = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1`;
    db.get(sql, [], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

exports.addJoke = ({ category, setup, delivery }) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO jokes (category, setup, delivery) VALUES (?, ?, ?)`;
    db.run(sql, [category, setup, delivery], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
};
