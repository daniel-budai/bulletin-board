const messageChannelTable = `
  CREATE TABLE IF NOT EXISTS message_channel (
    messageId INTEGER,
    channelId INTEGER,
    PRIMARY KEY(messageId, channelId),
    FOREIGN KEY(messageId) REFERENCES message(MessageId),
    FOREIGN KEY(channelId) REFERENCES channel(channel_id)
  );
`;

module.exports = messageChannelTable;
