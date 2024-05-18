const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

createUser = (req, res) => {
  const { username } = req.body;

  const sql = `INSERT INTO user (user_name) VALUES (?)`;
  const params = [username];

  db.run(sql, params, function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.status(201).json({ id: this.lastID });
  });
};

getAllUsers = (req, res) => {
  const sql = `SELECT * FROM user`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).json(rows);
  });
};

updateUserName = (req, res) => {
  const { id, username } = req.body;

  const sql = `UPDATE user SET user_name = ? WHERE user_id = ?`;
  const params = [username, id];

  db.run(sql, params, function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).json({ id: id, user_name: username });
  });
};

deleteUser = (req, res) => {
  const { id } = req.body;

  const sql = `DELETE FROM user WHERE user_id = ?`;
  const params = [id];

  db.run(sql, params, function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).json({ id: id });
  });
};

module.exports = { createUser, getAllUsers, updateUserName, deleteUser };
