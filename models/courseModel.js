const pool = require("../config/database");

const addCourse = async (courseName, courseDescribe, category) => {
  const [result] = await pool.query(
    "INSERT INTO courses (course_name, course_describe, category) VALUES (?, ?, ?) ",
    [courseName, courseDescribe, category]
  );
  return result.insertId;
};

const getAllCourses = async () => {
  const [result] = await pool.query("SELECT * FROM courses");
  return result;
};

const getCourseInfo = async (id) => {
  const [result] = await pool.query("SELECT * FROM courses WHERE id = ?", [id]);
  return result.length > 0 ? result[0] : null;
};

const deleteCourse = async (id) => {
  const [result] = await pool.query("DELETE FROM courses WHERE id = ?", [id]);
  return result.affectedRows;
};

const getCoursesByCategory = async (category) => {
  const [result] = await pool.query(
    "SELECT * FROM courses WHERE category = ?",
    [category]
  );
  return result;
};

const getNewCourses = async () => {
  const [result] = await pool.query(
    "SELECT * FROM courses ORDER BY created_at DESC LIMIT 4;"
  );
  return result;
};

const getSearchCourses = async (textSearch) => {
  const [result] = await pool.query(
    "SELECT * FROM courses WHERE course_name LIKE ?;",
    [`%${textSearch}%`]
  );
  return result.length > 0 ? result : [];
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
  getCoursesByCategory,
  getNewCourses,
  getSearchCourses,
};
