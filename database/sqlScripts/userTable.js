const usersTable = `
  CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY, 
    user_name VARCHAR(255)
  );
`;

module.exports = usersTable;
