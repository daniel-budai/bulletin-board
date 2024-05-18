const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

const postMessage = (req, res) => {
  const { userId, channelId, message } = req.body;

  // Kontrollera om prenumerationen existerar
  const sql = `SELECT * FROM subscription WHERE userId = ? AND channelId = ?`;
  db.get(sql, [userId, channelId], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    // Om prenumerationen inte existerar, returnera ett felmeddelande
    if (!row) {
      return res
        .status(400)
        .json({ error: "Du måste prenumerera på kanalen först." });
    }

    // Om prenumerationen existerar, posta meddelandet
    const sql = `INSERT INTO message (userId, channelId, message) VALUES (?, ?, ?)`;
    db.run(sql, [userId, channelId, message], function (err) {
      if (err) {
        return console.error(err.message);
      }
      res.status(200).json({ message: "Meddelandet har postats." });
    });
  });
};

module.exports = {
  postMessage,
};
