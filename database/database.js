const usersTable = require("../database/sqlScripts/userTable");
const channelsTable = require("../database/sqlScripts/channelTable");
const messagesTable = require("../database/sqlScripts/messageTable");

const sqlite3 = require("sqlite3").verbose();

const initDatabase = () => {
  const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  db.run(usersTable);
  db.run(channelsTable);
  db.run(messagesTable);
};

initDatabase();

module.exports = { initDatabase };
