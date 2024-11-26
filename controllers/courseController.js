const courseModel = require("../models/courseModel");


const createCourse = async (req,res) => {

    try{
    const {courseName, courseDescribe} = req.body;
    const courseID = await courseModel.addCourse(courseName, courseDescribe);
    }catch (e) {
        return res.status(500).json({
            message: e.message,
        })
    }
  



}

module.exports = {
    createCourse,
}