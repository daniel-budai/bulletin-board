const channelsTable = `
  CREATE TABLE IF NOT EXISTS channel (
    channel_id INTEGER PRIMARY KEY, 
    channel_name VARCHAR(255),
    channel_owner_id INTEGER,
    FOREIGN KEY(channel_owner_id) REFERENCES user(user_id)
  );
`;

module.exports = channelsTable;
