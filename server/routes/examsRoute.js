const router = require('express').Router();
const Exam = require('../models/examModel');
const authMiddleware = require('../middlewares/authMiddleware');
const Question = require("../models/questionModel")


// Add Exam
router.post('/add',authMiddleware, async(req,res)=>{
    try {
        // check if exam name alredy exists
        const examExists = await Exam.findOne({name: req.body.name});
        if(examExists){
            return res.status(200).send({message: 'Exam Already Exists', success: false});
        }
        req.body.questions=[]
        const newExam = new Exam(req.body);
        await newExam.save();
        res.send({
            message: 'Exam Added Successfully',
            success: true
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }
});

// Get All Exams
router.post('/get-all-exams',authMiddleware,async(req,res)=>{
    try {
        const exams = await Exam.find({});
        res.send({
            message:'Exams Fetched Successfully',
            data: exams,
            success: true
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }
})

// Get Exam by ID
router.post('/get-exam-by-id',authMiddleware, async(req,res)=>{
    try {
        const exam = await Exam.findById(req.body.examId).populate("questions");
        res.send({
            message: 'Exam fetched Successfully',
            data: exam,
            success: true
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }
});

// edit Exam by ID
router.post('/edit-exam-by-id', authMiddleware,async(req,res)=>{
    try {
        await Exam.findByIdAndUpdate(req.body.examId,req.body);
        res.send({
            message: 'Exam Edited Successfully',
            success: true
        });
    } catch (error) {
        res.status(500).send({
            message:error.message,
            data: error,
            success: false
        });
    }
});

// Delete Exam by Id
router.post('/delete-exam-by-id', authMiddleware,async(req,res)=>{
    try {
        await Exam.findByIdAndDelete(req.body.examId);
        res.send({
            message: 'Exam Deleted Successfully',
            success: true
        });
    } catch (error) {
        res.status(500).send({
            message:error.message,
            data: error,
            success: false
        });
    }
});

// Add Question To Exam
router.post("/add-question-to-exam",authMiddleware, async(req,res)=>{
    try {
        // add question to question collection
        const newQuestion = new Question(req.body);
        const question = await newQuestion.save();
        
        // Add Question to exam
        const exam = await Exam.findById(req.body.exam);
        exam.questions.push(question._id);
        await exam.save();
        res.send({
            message: "Questions Added Successfully",
            success: true
        });
    } catch (error) {
        res.status(500).send({
            message:error.message,
            data: error,
            success: false
        });
    }
});

// Edit Question in Exam
router.post("/edit-question-in-exam",authMiddleware, async(req,res)=>{
    try {
        // edit questions in Question Collection
        await Question.findByIdAndUpdate(req.body.questionId, req.body);
        res.send({
            message: "Question Edited Successfully",
            success: true
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }
});

// Delete Question in Exam
router.post("/delete-question-in-exam",authMiddleware, async(req,res)=>{
    try {
        // delete questions in question collection
        await Question.findByIdAndDelete(req.body.questionId);

        // Delete Question in Exam
        const exam = await Exam.findById(req.body.examId);
        exam.questions = exam.questions.filter(
            (question) => question._id != req.body.questionId);
            await exam.save();
            res.send({
                message: "Question Deleted Successfully",
                success: true
            });
    } catch (error) {
        
    }
});

module.exports = router;