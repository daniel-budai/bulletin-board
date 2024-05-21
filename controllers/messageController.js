const sqlite3 = require("sqlite3").verbose();
const { format } = require("date-fns");
const db = new sqlite3.Database("./database.db");

const postMessage = (req, res) => {
  const { userId, channelId, message } = req.body;
  const sql = `
  SELECT userId, channelId FROM subscription WHERE userId = ? AND channelId = ? 
  UNION 
  SELECT ownerId AS userId, channel_id AS channelId FROM channel WHERE ownerId = ? AND channel_id = ?
`;
  db.get(sql, [userId, channelId, userId, channelId], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    if (!row) {
      return res.status(400).json({
        error: "Du måste prenumerera på kanalen eller vara ägaren först.",
      });
    }

    const sql = `INSERT INTO message (userId, channelId, Title, createdAt) VALUES (?, ?, ?, ?)`;
    db.run(
      sql,
      [userId, channelId, message, format(new Date(), "yyyy-MM-dd-HH:mm:ss")],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
        const sql = `INSERT INTO message_channel (messageId, channelId) VALUES (?, ?)`;
        db.run(sql, [this.lastID, channelId], function (err) {
          if (err) {
            return console.error(err.message);
          }
          res.status(200).json({ message: "Meddelandet har postats." });
        });
      }
    );
  });
};

const updateMessage = (req, res) => {
  const { messageId, newMessage } = req.body;

  const sql = `UPDATE message SET message = ? WHERE MessageId = ?`;
  db.run(sql, [newMessage, messageId], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).json({ message: "Message updated successfully." });
  });
};

const getAllMessagesByUserId = (req, res) => {
  const { userId } = req.params;

  const sql = `SELECT * FROM message WHERE userId = ?`;
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).json(rows);
  });
};

const deleteMessage = (req, res) => {
  const { messageId } = req.body;

  const sql = `DELETE FROM message WHERE MessageId = ?`;
  db.run(sql, [messageId], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).json({ message: "Message deleted successfully." });
  });
};

const getMessagesFromChannel = (req, res) => {
  const { channelId } = req.params;
  const sql = `SELECT * FROM message INNER JOIN message_channel ON message.MessageId = message_channel.messageId WHERE message_channel.channelId = ? ORDER BY createdAt DESC`;
  db.all(sql, [channelId], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).json(rows);
  });
};

module.exports = {
  postMessage,
  updateMessage,
  getAllMessagesByUserId,
  deleteMessage,
  getMessagesFromChannel,
};
