const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

router.post('/addQuestions', questionController.addQuestions);
router.get('/getAllQuestions',questionController.getAllQuestions);
router.get('/getQuestionsInLesson',questionController.getQuestionsInLesson);



module.exports = router;