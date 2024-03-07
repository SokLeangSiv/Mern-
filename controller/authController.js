import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import { comparePassword, hashPassword } from '../utils/hashPassword.js';
import { UnauthenticatedError } from '../errors/customErrors.js'; // Add this line
import { createJwt } from '../utils/jwtToken.js';

export const getAllUsers = async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json({
            message: "Data received successfully!",
            users
        })
    }catch(err){
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

export const register = async(req,res)=>{

    const isFirst = await User.countDocuments()  === 0;
    req.body.role = isFirst ? "admin" : "user";

    const hashedPassword =  await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);

    res.status(201).json({
        message: "User create successfully!",
        user
    })
}

export const login = async(req,res)=>{
    

 
        try {
          const user = await User.findOne({ email: req.body.email });
          if (!user) {
            return res.status(404).json({
              message: "User not found!",
            });
          }
          
          
      
          const isPasswordCorrect = await comparePassword(req.body.password, user.password);

          if (!isPasswordCorrect) {
            return res.status(401).json({
              message: "Invalid credentials",
            });
          }
      
          if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid credentials");

          const token = createJwt({userId: user._id, role: user.role});

          const oneDay = 24*60*60*1000;

          res.cookie("token", token,{
            httpOnly: true,
            expires: new Date(Date.now() + oneDay),
            secure: process.env.NODE_ENV === "production"
          })
          
          res.status(200).json({
            msg: "User logged in successfully!",
          });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
      };


      export const logout =  (req, res)=>{
        res.cookie('token', 'logout',{
            httpOnly:true,
            expires: new Date(Date.now())
        }).json({message:"logged out"});
        
    };