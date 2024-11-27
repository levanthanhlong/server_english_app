const lessonModel = require("../models/lessonModel");

const createLesson = async (req, res) => {
  try {
    const { courseId, lessonDescribe, videoUrl } = req.body;
    const lessonId = await lessonModel.createLesson(
      courseId,
      lessonDescribe,
      videoUrl
    );
    console.log(lessonId);
    if (lessonId) {
      return res.status(200).json({
        status: 1,
        message: "Create lesson success!",
        lessonId,
      });
    } else {
      return res.status(500).json({
        status: 0,
        message: "Course does not exist",
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: e.message,
    });
  }
};

const getAllLessonInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const listLesson = await lessonModel.getAllLessonInCourse(courseId);
    const numberLessons = listLesson.length ?? 0;
    if (!numberLessons) {
      return res.status(200).json({
        status: 1,
        message: "Get list lesson success",
        numberLessons,
        listLesson,
      });
    } else {
      return res.status(200).json({
        message: "Get list lesson success",
        status: 1,
        numberLessons: 0,
        listLesson,
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: e.message,
    });
  }
};

const getLessonInfo = async (req, res) => {
  try {
    const { id } = req.body;
    const lessonInfo = await lessonModel.getLessonInfo(id);
    if (lessonInfo) {
      return res.status(200).json({
        status: 1,
        message: "Get lesson info success",
        lessonInfo,
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "This lesson is not available yet.",
        lessonInfo,
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: e.message,
    });
  }
};
const deleteLesson = (req, res) => {};

module.exports = {
  createLesson,
  getAllLessonInCourse,
  getLessonInfo,
  deleteLesson,
};
