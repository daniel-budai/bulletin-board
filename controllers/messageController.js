const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

const postMessage = (req, res) => {
  const { userId, channelId, message } = req.body;

  // Check if the subscription exists or if the user is the owner of the channel
  const sql = `
  SELECT userId, channelId FROM subscription WHERE userId = ? AND channelId = ? 
  UNION 
  SELECT ownerId AS userId, channel_id AS channelId FROM channel WHERE ownerId = ? AND channel_id = ?
`;
  db.get(sql, [userId, channelId, userId, channelId], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    // If the subscription does not exist and the user is not the owner of the channel, return an error message
    if (!row) {
      return res.status(400).json({
        error: "Du måste prenumerera på kanalen eller vara ägaren först.",
      });
    }

    // If the subscription exists or the user is the owner of the channel, post the message
    const sql = `INSERT INTO message (userId, channelId, Title) VALUES (?, ?, ?)`;
    db.run(sql, [userId, channelId, message], function (err) {
      if (err) {
        return console.error(err.message);
      }
      res.status(200).json({ message: "Meddelandet har postats." });
    });
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

// Get all messages by a user
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

// Delete a message
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

module.exports = {
  postMessage,
  updateMessage,
  getAllMessagesByUserId,
  deleteMessage,
};
