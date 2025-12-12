import User from "../models/userModel.js";
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

dotenv.config();

export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({
            success:false,
            message:"User already exists. Proceed to login"
        })
    }
    const hashedpassword = await bcrypt.hash(password,10);
    const newUser = await User.create({
      name,
      email,
      password:hashedpassword
    })
    return res.status(200).json({
      success:true,
      message:"User created successfully.",
      userId: newUser._id
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req,res)=>{
  try {
    const {email, password} = req.body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        success: false,
        message:"User not found"
      })
    }

    const matchPassword = await bcrypt.compare(password,user.password)
    if(!matchPassword){
      return res.status(400).json({
        success: false,
        message:"Invalid password"
      })
    }
    const token = jwt.sign({user: user._id}, process.env.JWT_SECRET);
    user.isLoggedin = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}