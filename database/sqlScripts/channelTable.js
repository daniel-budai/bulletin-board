const channelsTable = `
  CREATE TABLE IF NOT EXISTS channel (
    channel_id INTEGER PRIMARY KEY, 
    channel_name VARCHAR(255),
    ownerId INTEGER,
    FOREIGN KEY(ownerId) REFERENCES user(user_id)
  );
`;

module.exports = channelsTable;
