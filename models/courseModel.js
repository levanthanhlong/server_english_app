const pool = require("../config/database");

const addCourse = async (courseName, courseDescribe) => {
  const [result] = await pool.query(
    "INSERT INTO courses (course_name, course_describe) VALUES (?, ?) ",
    [courseName, courseDescribe]
  );
  return result.insertId;
};

const getAllCourses = async () => {
  const [result] = await pool.query(
    "SELECT * FROM courses",
  );
  return result;
};

const getCourseInfo = async (id) => {
  const [result] = await pool.query(
    "SELECT * FROM courses WHERE id = ?",
    [id]
  );
  return result.length > 0 ? result[0] : null;
}

const deleteCourse = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM courses WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};

const findCourseByName = async () => {};

const updateCourse = async () => {};

module.exports = {
  addCourse,
  deleteCourse,
  updateCourse,
  findCourseByName,
  getAllCourses,
  getCourseInfo,
};
