const usersTable = require("../database/sqlScripts/userTable");
const channelsTable = require("../database/sqlScripts/channelTable");
const messagesTable = require("../database/sqlScripts/messageTable");
const subscriptionTable = require("../database/sqlScripts/subscribeTable");
const messageChannelTable = require("../database/sqlScripts/messageChannelTable");

const sqlite3 = require("sqlite3").verbose();

const initDatabase = () => {
  const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the SQLite database.");
  });

  db.serialize(() => {
    db.run(usersTable);
    db.run(channelsTable);
    db.run(messagesTable);
    db.run(subscriptionTable);
    db.run(messageChannelTable);
  });

  return db;
};

module.exports = initDatabase();
