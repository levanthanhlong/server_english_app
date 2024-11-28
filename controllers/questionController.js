const fileQuestion = "storeQuestions/questions.json";
const questionModel = require("../models/questionModel");

const addQuestions = async (req, res) => {
  try {
    // Dữ liệu từ client gửi lên 
    const questionsData = req.body;

    // Kiểm tra nếu là một mảng
    if (Array.isArray(questionsData)) {
      // Xử lý trường hợp là mảng các câu hỏi
      for (const question of questionsData) {
        // dùng pool.query để thêm từng câu hỏi vào DB
        const questionId = await questionModel.addQuestion(question);
        console.log(questionId);
      }

      return res.status(201).json({
        status: 1,
        message: `${questionsData.length} questions have been added to the database.`,
      });
    } else if (typeof questionsData === "object" && questionsData !== null) {
      // Xử lý trường hợp là một câu hỏi duy nhất
      const question = questionsData;
      const questionId = await questionModel.addQuestion(question);
      console.log(questionId);
      return res.status(200).json({
        status: 1,
        message: "The question has been added to the database",
      });
    } else {
      // Nếu không phải mảng hoặc đối tượng hợp lệ
      return res.status(400).json({
        status: 0,
        message: "Invalid data. Please send an object or an array of objects.",
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: e.message,
    });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const listQuestions = await questionModel.getAllQuestion();
    if (listQuestions.length === 0) {
      return res.status(200).json({
        status: 0,
        message: "There are no questions",
      });
    } else {
      return res.status(200).json({
        status: 1,
        message: "Get questions success",
        listQuestions,
      });
    }
    
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: e.message,
    });
  }
};

const getQuestionsInLesson = async (req, res) => {
  try {
    const {lessonId} = req.body;
    const listQuestions = await questionModel.getQuestionsInLesson(lessonId);   

    if(listQuestions.length === 0) {
        return res.status(200).json({
            status: 0,
            message: "There are no question in this lesson."
        });
    } else {
        return res.status(200).json({
            status: 1,
            message: "Get questions success",
            listQuestions
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
  addQuestions,
  getQuestionsInLesson,
  getAllQuestions,
};
