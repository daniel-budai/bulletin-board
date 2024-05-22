const db = require("../database/database");

const createChannel = (req, res) => {
  const { channel_name, ownerId } = req.body;
  const sql = `INSERT INTO channel (channel_name, ownerId) VALUES (?, ?)`;
  db.run(sql, [channel_name, ownerId], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).json({ message: "Channel created." });
  });
};

const getChannels = (req, res) => {
  const sql = `SELECT * FROM channel`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).json(rows);
  });
};

const updateChannel = (req, res) => {
  const { channel_id, channel_name, ownerId } = req.body;
  const sql = `UPDATE channel SET channel_name = ?, ownerId = ? WHERE channel_id = ?`;
  db.run(sql, [channel_name, ownerId, channel_id], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).json({ message: "Channel updated." });
  });
};

const deleteChannel = (req, res) => {
  const { channel_id } = req.body;
  const sql = `DELETE FROM channel WHERE channel_id = ?`;
  db.run(sql, [channel_id], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).json({ message: "Channel deleted." });
  });
};

const subscribeToChannel = (req, res) => {
  const { userId, channelId } = req.body;
  const sql = `INSERT INTO subscription (userId, channelId) VALUES (?, ?)`;
  db.run(sql, [userId, channelId], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).json({ message: "Subscribed to channel." });
  });
};

module.exports = {
  createChannel,
  getChannels,
  updateChannel,
  deleteChannel,
  subscribeToChannel,
};
