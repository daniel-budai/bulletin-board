const usersTable = require("../database/sqlScripts/userTable");
const channelsTable = require("../database/sqlScripts/channelTable");
const messagesTable = require("../database/sqlScripts/messageTable");
const subscriptionTable = require("../database/sqlScripts/subscribeTable");

const sqlite3 = require("sqlite3").verbose();

const initDatabase = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./database.db", (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
    });

    db.run(usersTable, (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
    });
    db.run(channelsTable, (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
    });
    db.run(messagesTable, (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
    });
    db.run(subscriptionTable, (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
    });

    resolve();
  });
};
initDatabase();

module.exports = { initDatabase };
