const express = require("express");
const router = express.Router();
const userAndCourseController = require("../controllers/userAndCourseController");

router.post("/addUserAndCourse", userAndCourseController.addUserAndCourse);
router.get(
  "/getUsersRegisterCourse",
  userAndCourseController.getUsersRegisterCourse
);
router.get(
  "/getCoursesUserRegister",
  userAndCourseController.getCoursesUserRegister
);
router.get(
  "/checkRegisterCourse",
  userAndCourseController.checkRegisterCourse
);
module.exports = router;
