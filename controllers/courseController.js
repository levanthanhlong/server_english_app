const courseModel = require("../models/courseModel");

//  create course
const createCourse = async (req, res) => {
  try {
    const { courseName, courseDescribe } = req.body;
    const courseID = await courseModel.addCourse(courseName, courseDescribe);
    return res.status(200).json({
      status: 1,
      message: "Add course success",
      courseID,
    });
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: e.message,
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const totalCourse = await courseModel.getAllCourses();
    return res.status(200).json({
      status: 1,
      message: "Get all courses success",
      totalCourse,
    });
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: e.message,
    });
  }
};

const getCourseInfo = async (req, res) => {
  try {
    const { id } = req.body;
    const courseInfo = await courseModel.getCourseInfo(id);

    return res.status(200).json({
      status: 1,
      message: "Get course info success!",
      courseInfo,
    });
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: e.message,
    });
  }
};

// delete course by  id
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.body;
    const numberCoursesDeleted = await courseModel.deleteCourse(id);
    console.log(numberCoursesDeleted);
    if (numberCoursesDeleted > 0) {
      return res.status(200).json({
        status: 1,
        message: `xoá thành công khoá học ${id}`,
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: `không tìm thấy ${id} `,
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: e.message,
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseInfo,
  deleteCourse,
};
