const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const secretKey = "thanh2001";

const getUserInfo = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "No token provided!" });
    }
    // Giải mã token và lấy ra payload (thông tin chứa trong token)
    const decoded = jwt.verify(token, secretKey);

    // Lấy userID từ decoded token
    const userID = decoded.userID;

    const userInfo = await userModel.findUserByUserID(userID);
    const fullname = userInfo.full_name ?? 'no Name';

    res.status(200).json({ message : "get userInfo success", fullname});
  } catch (e) {
    res.status(500).json({ message: String(e) });
  }
};

module.exports = {
  getUserInfo,
};
