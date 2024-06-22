const mongoose = require ("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true    
    },
    password:{
        type: String,
        required: true
    },
    rollno:{
        type: Number,
        required: true,
        unique: true
    },
    phoneno:{
        type: Number,
        required: true,
        unique: true
    },
    university:{
        type: String,
        required: true
    },
    college:{
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    session:{
        type: String,
        required: true
    },
    semester:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});
const userModel = mongoose.model("users",userSchema);
module.exports = userModel;