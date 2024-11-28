const pool = require("../config/database");
const userModel = require("../models/userModel");
const courseModel = require("../models/courseModel");
const addUserAndCourse = async (userId, courseId) => {
  const checkUser = await userModel.findUserByUserId(userId);
  console.log(userId);
  const checkCourse = await courseModel.getCourseInfo(courseId);
  console.log(checkCourse);
  console.log(checkUser);
  if (checkUser && checkCourse) {
    const [result] = await pool.query(
      "INSERT INTO course_user (course_id, user_id) VALUES (?, ?) ",
      [courseId, userId]
    );
    return result.affectedRows;
  } else {
    return 0;
  }
};

const getUsersRegisterCourse = async (courseId) => {
  const [result] = await pool.query(
    "SELECT * FROM course_user WHERE course_id = ?",
    [courseId]
  );
  return result.length;
};

const getCoursesUserRegister = async (userId) => {
  const [result] = await pool.query(
    "SELECT * FROM course_user WHERE user_id = ?",
    [userId]
  );
  return result.length;
};

module.exports = {
  addUserAndCourse,
  getCoursesUserRegister,
  getUsersRegisterCourse,
};
