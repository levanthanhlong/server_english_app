const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");

router.post("/createLesson", lessonController.createLesson);
router.get("/getAllLessonInCourse",lessonController.getAllLessonInCourse);
router.get("/getLessonInfo",lessonController.getLessonInfo);
router.delete("/deleteLesson", lessonController.deleteLesson);

module.exports = router;