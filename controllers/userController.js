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
    const userId = decoded.userId;

    const userInfo = await userModel.findUserByUserId(userId);
    const fullname = userInfo.full_name ?? "no Name";

    return res
      .status(200)
      .json({ status: 1, message: "get userInfo success", fullname });
  } catch (e) {
    return res.status(500).json({ message: String(e) });
  }
};

module.exports = {
  getUserInfo,
};
