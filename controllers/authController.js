const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const register = async (req, res) => {
  const { username, password, email, fullname } = req.body;
  
  try {
    // kiểm tra xem username đã tồn tại chưa?
    const existingUser = await userModel.findUserByUsername(username);

    if (existingUser) {
      throw new Error("Username already exists!");
    }
    // Trả về ID của người dùng vừa tạo
    const userId = await userModel.addUser(username, password, email, fullname);
    // Tạo JWT token cho người dùng sau khi đăng ký thành công
    const token = jwt.sign({ userId }, "thanh2001");

    // Trả về token
    return res.status(200).json({ message: "Registration successful!", token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({
        message: "Please fill in all information",
      });
    }

    // Lấy thông tin người dùng từ cơ sở dữ liệu
    const user = await userModel.findUserByUsername(username);

    if (!user) {
      return res.status(400).json({
        message: "Incorrect username",
      });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const userID = user.id;
    // Tạo JWT token với userID
    const token = jwt.sign({ userID }, "thanh2001");

    return res.status(201).json({ message: "Login successful!", token });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "An error occurred, please try again later!" });
  }
};

module.exports = { register, login };