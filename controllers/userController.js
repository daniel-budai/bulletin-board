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

module.exports = { createUser };
