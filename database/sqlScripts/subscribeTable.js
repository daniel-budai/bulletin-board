const subscriptionTable = `
  CREATE TABLE IF NOT EXISTS subscription (
    userId INTEGER,
    channelId INTEGER,
    PRIMARY KEY(userId, channelId),
    FOREIGN KEY(userId) REFERENCES user(user_id),
    FOREIGN KEY(channelId) REFERENCES channel(channel_id)
  );
`;

module.exports = subscriptionTable;
