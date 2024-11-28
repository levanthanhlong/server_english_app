const pool = require("../config/database");
const lessonModel = require("../models/lessonModel");

const addQuestion = async (question) => {
console.log(question);
  const checkLesson = await lessonModel.getLessonInfo(question.lesson_id);
  if (checkLesson) {
    const [result] = await pool.query(
      "INSERT INTO lesson_questions (lesson_id, question, option_a, option_b, option_c, option_d, correct_option) VALUES ( ?, ?, ?, ?, ?, ?, ? )",
      [
        question.lesson_id,
        question.question,
        question.option_a,
        question.option_b,
        question.option_c,
        question.option_d,
        question.correct_option,
      ]
    );
    return result.insertId;
  } else {
    return null;
  }
}; 

const getAllQuestion = async () => {
  const [result] = await pool.query("SELECT * FROM lesson_questions");
  return result.length > 0 ? result : [];
};

const getQuestionsInLesson = async (lessonId) => {
    const [result] = await pool.query(
        "SELECT * FROM lesson_questions WHERE lesson_id = ?",
        [lessonId]
    );
    return result.length > 0 ? result : [];
}

module.exports = {
  addQuestion,
  getAllQuestion,
  getQuestionsInLesson,
};
