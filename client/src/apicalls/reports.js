const {default : axiosInstance} = require(".");

// Add Report
export const addReport = async(payload)=>{
    try {
        const response = await axiosInstance.post("/api/reports/add-report",payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// Get all Reports
export const getAllReports = async(filters)=>{
    try {
        const response = await axiosInstance.post("/api/reports/get-all-reports",filters);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// Get all Reports by User
export const getAllReportsByUser = async()=>{
    try {
        const response = await axiosInstance.post("/api/reports/get-all-reports-by-user");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}