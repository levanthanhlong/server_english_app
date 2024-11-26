const pool = require("../config/database");

const addCourse = async (courseName, courseDescribe) => {
    const [result] = await pool.query(
        "INSERT INTO courses (course_name, course_describe) VALUES (?, ?) ",
        [courseName,courseDescribe]
    );
    return result.insertId;
}

const deleteCourse = async () => {
    
}

const findCourseByName = async () => {

}

const updateCourse = async () => {

}

module.exports = {
  addCourse,
  deleteCourse,
  updateCourse,
  findCourseByName,
};