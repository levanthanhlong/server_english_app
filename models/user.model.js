const db = require("../config/database");

const User = {
  create: async (username, hashedPassword) => {
    const [result] = await db.execute(
      "INSERT INTO User (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );
    return result;
  },
  findByUsername: async (username) => {
    const [rows] = await db.execute("SELECT * FROM User WHERE username = ?", [
      username,
    ]);
    return rows[0];
  },
};

module.exports = User;
