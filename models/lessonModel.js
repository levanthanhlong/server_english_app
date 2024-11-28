const pool = require("../config/database");
const courseModel = require("./courseModel");

const createLesson = async (courseId, lessonDescribe, videoUrl) => {
  const checkCourse = await courseModel.getCourseInfo(courseId);
  if (checkCourse) {
    const [result] = await pool.query(
      "INSERT INTO lesson (course_id, lesson_describe, video_url) VALUES (?, ?, ?)",
      [courseId, lessonDescribe, videoUrl]
    );
    console.log(result);
    return result.insertId;
  } else {
    return null;
  }
};

const getAllLessonInCourse = async (courseId) => {
  const checkCourse = await courseModel.getCourseInfo(courseId);
  if (checkCourse) {
    const [result] = await pool.query(
      "SELECT * FROM lesson WHERE course_id = ?",
      [courseId]
    );
    return result.length > 0 ? result : [];
  } else {
    return null;
  }
};

const getLessonInfo = async (lessonId) => {
  const [result] = await pool.query("SELECT * FROM lesson WHERE id = ?", [
    lessonId,
  ]);
  // console.log(result);
  return result.length > 0 ? result[0] : null;
};

const deleteLesson = async (lessonId) => {
  const [result] = await pool.query("DELETE FROM lesson WHERE id = ?", [
    lessonId,
  ]);
  return result.affectedRows;
};

module.exports = {
  createLesson,
  getAllLessonInCourse,
  getLessonInfo,
  deleteLesson,
};
