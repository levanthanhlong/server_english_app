const userAndCourseModel = require("../models/userAndCourseModel");
const secretKey = "thanh2001";
const jwt = require("jsonwebtoken");

const addUserAndCourse = async (req, res) => {
  try {
    const { token, courseId } = req.body;
    if (!token) {
      return res.status(400).json({ status: 0, message: "No token provided!" });
    }
    // Giải mã token và lấy ra payload (thông tin chứa trong token)
    const decoded = jwt.verify(token, secretKey);

    // Lấy userID từ decoded token
    const userId = decoded.userId;
    const result = await userAndCourseModel.addUserAndCourse(userId, courseId);
    if (result > 0) {
      return res.status(200).json({
        status: 1,
        message: "Add success",
        result,
      });
    } else {
      return res.status(400).json({
        status: 0,
        message: "Can't add",
        result,
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: e.message,
    });
  }
};

const getUsersRegisterCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const listUsers = await userAndCourseModel.getUsersRegisterCourse(courseId);
    if (listUsers.length > 0) {
      return res.status(200).json({
        status: 1,
        message: "Get list Users success",
        listUsers,
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "No one has registered for this course yet.",
        listUsers,
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: e.message,
    });
  }
};

const getCoursesUserRegister = async (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: e.message,
    });
  }
};

module.exports = {
  addUserAndCourse,
  getUsersRegisterCourse,
  getCoursesUserRegister,
};
