const courseModel = require("../models/courseModel");

//  create course
const createCourse = async (req, res) => {
  try {
    const { courseName, courseDescribe, category } = req.body;
    const courseID = await courseModel.addCourse(
      courseName,
      courseDescribe,
      category
    );
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

//get all courses
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

// get new courses
const getNewCourses = async (req, res) => {
  try {
    const newCourses = await courseModel.getNewCourses();
    return res.status(200).json({
      status: 1,
      message: "Get all courses success",
      newCourses,
    });
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: e.message,
    });
  }
};

// get courses by category
const getCoursesByCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const categoryCourses = await courseModel.getCoursesByCategory(category);
    return res.status(200).json({
      status: 1,
      message: "Get courses by category success",
      categoryCourses,
    });
  } catch (e) {
    return res.status(500).json({ status: 0, message: e.message });
  }
};


// get course information
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

// search course by text
const getSearchCourses = async (req, res) => {
  try {
    const { text } = req.body;
    const listSearchCourse = await courseModel.getSearchCourses(text);
    if(listSearchCourse.length < 1) {
      return res.status(200).json({
        status: 0,
        message: "No course found",
      });
    }else {
      return res.status(200).json({
        status: 1,
        message: "Get search courses success!",
        listSearchCourse,
      });
    }
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
  getCoursesByCategory,
  getNewCourses,
  getSearchCourses,
};
