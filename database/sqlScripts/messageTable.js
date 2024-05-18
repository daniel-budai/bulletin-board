const messagesTable = `
  CREATE TABLE IF NOT EXISTS message (
    MessageId INTEGER PRIMARY KEY,
    channelId INTEGER,
    userId INTEGER,
    Title TEXT,
    Description TEXT,
    createdAt DATE,
    FOREIGN KEY(channelId) REFERENCES channel(channel_id),
    FOREIGN KEY(userId) REFERENCES user(user_id)
  );
`;

module.exports = messagesTable;
