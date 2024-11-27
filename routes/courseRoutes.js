const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");


router.post('/createCourse', courseController.createCourse);
router.get('/getAllCourses', courseController.getAllCourses);
router.get('/getCourseInfo', courseController.getCourseInfo);
router.delete('/deleteCourse',courseController.deleteCourse);

module.exports  = router;
