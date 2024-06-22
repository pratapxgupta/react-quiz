const {default: axiosInstance} = require('.');

// Add Exam
export const addExam = async(payload)=>{
    try {
        const response = await axiosInstance.post('/api/exams/add',payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Get All Exams
export const getAllExams = async()=>{
    try {
        const response = await axiosInstance.post('/api/exams/get-all-exams');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Get Exam By Id
export const getExamById = async(payload)=>{
    try {
        const response = await axiosInstance.post('/api/exams/get-exam-by-id',payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Edit Exam by id
export const editExamById = async(payload)=>{
    try {
        const response = await axiosInstance.post('/api/exams/edit-exam-by-id',payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Delete Exam by id
export const deleteExamById = async(payload)=>{
    try {
        const response = await axiosInstance.post('/api/exams/delete-exam-by-id',payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Add Questions to Exam
export const addQuestionToExam = async(payload)=>{
    try {
        const response = await axiosInstance.post("/api/exams/add-question-to-exam",payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Edit Question By Id
export const editQuestionById = async (payload)=>{
    try {
        const response = await axiosInstance.post("/api/exams/edit-question-in-exam",payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Delete Question By Id
export const deleteQuestionById = async(payload)=>{
    try {
        const response = await axiosInstance.post(
            "/api/exams/delete-question-in-exam",
            payload
        ); return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Get All Questions
export const getAllQuestions = async()=>{
    try {
        const response = await axiosInstance.post('/api/exams/get-all-questions');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};