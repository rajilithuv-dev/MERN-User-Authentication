const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const registerUser=async(req,res)=>{
    try {
    const {name,email,password}=req.body;
    //validate required fields
    if(!name || !email || !password){
        return res.status(400).json({ 
            success:false,
            message:"Please fill all the fields"
        });

    }
        //passeword validation
        if(password.length<8){
            return res.status(400).json({ 
                success:false,
                message:"Password must be at least 8 characters long"
            });
        }

        // normalize email
        const normalizedEmail = email.trim().toLowerCase();
        //check existing email
        const existingUser=await User.findOne({email:normalizedEmail});
        if(existingUser){
            return res.status(409).json({ 
                success:false,
                message:"Email already registered"
            });
        }
        // hash password
        const hashedPassword = await
        bcrypt.hash(password, 12);
        //new user creation
        const newUser=await User.create({
            name:name.trim(),
            email:normalizedEmail,
            password:hashedPassword
        });
    //generate JWT token
    const token=jwt.sign(
        {userId:newUser._id},
        process.env.JWT_SECRET,
        {
            expiresIn:"1h"
        } );
        //success response
        return res.status(201).json({
            success:true,
            message:" Registration successfully",
            token:token,
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email
            }
        });

    }

 catch(error) {
    console.log("Registeration Error:",error);
    return res.status(500).json({
        success:false,
        message:error. message
    });
}
};
module.exports={registerUser};