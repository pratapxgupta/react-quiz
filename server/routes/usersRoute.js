const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require ('bcryptjs');
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');

// User Registration
router.post('/register',async(req,res)=>{
    try {
        // Check if user already exists or not
        const userExists = await User.findOne({email: req.body.email});
        if (userExists){
            return res.status(200).send({message:"User Already Exists",success:false});
        }
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        // Create New User
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            message: "User created successfully",
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

// User Login
router.post('/login',async(req,res)=>{

    try {
        // check if user exists or not
    const user = await User.findOne({ email: req.body.email});
    if (!user){
        return res.status(200).send({message: "User does not exist",success: false});
    }
    // check password
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password);
    if (!validPassword){
        return res.status(200).send({message: "Invalid Password",success:false});
    }

    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );
        res.send({
            message: "User Logged in Successfully",
            success: true,
            data: token
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }
        
});

//Get User Info
router.post("/get-user-info", authMiddleware, async (req,res)=>{
    try {
        const user = await User.findById(req.body.userId);
        res.send({
            message: "User info Fetched Successfully",
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }
});

module.exports = router;