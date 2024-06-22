const express = require ('express');
require("dotenv").config();
const dbConfig = require('./config/dbConfig');
const app = express();
const usersRoute = require('./routes/usersRoute');
const examsRoute = require('./routes/examsRoute');
const reportsRoute = require("./routes/reportsRoute");

dbConfig();

app.use(express.json());
app.use("/api/users",usersRoute);
app.use("/api/exams",examsRoute);
app.use("/api/reports",reportsRoute);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})
