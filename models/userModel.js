const pool = require("../config/database");
const bcrypt = require("bcryptjs");

const addUser = async (username, password, email, fullname) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    "INSERT INTO user (username, password, email, full_name) VALUES (?, ?, ?, ?)",
    [username, hashedPassword, email, fullname]
  );
  return result.insertId;
};

const findUserByUsername = async (username) => {
  const [result] = await pool.query("SELECT * FROM user WHERE username = ?", [
    username,
  ]);
  return result.length > 0 ? result[0] : null;
};

const findUserByUserID = async (userID) => {
  const [result] = await pool.query("SELECT * FROM user WHERE id = ?", [
    userID,
  ]);
   console.log(result);
  return result.length > 0 ? result[0] : null;
};

module.exports = {
  findUserByUsername,
  findUserByUserID,
  addUser,
};
