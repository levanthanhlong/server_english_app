const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/createCourse", courseController.createCourse);
router.get("/getAllCourses", courseController.getAllCourses);
router.get("/getCourseInfo", courseController.getCourseInfo);
router.delete("/deleteCourse", courseController.deleteCourse);
router.get("/getCoursesByCategory", courseController.getCoursesByCategory);
router.get("/getNewCourses", courseController.getNewCourses);
router.get("/getSearchCourses", courseController.getSearchCourses);

module.exports = router;
