import { StatusCodes } from "http-status-codes";
import User from "../model/userModel.js";
import Job from "../model/jobModel.js";
import cloudinary from 'cloudinary';
import { promises as fs } from "fs";

export const getCurrentUser= async (req, res) => {

    const getCurrentUser = await User.findOne({_id: req.user.userId});
    const getUserWithoutPassword = getCurrentUser.toJSON();
    res.json({ user : getUserWithoutPassword   });
}

export const getApplicationStats = async (req, res) => {

    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();

    res.json({users, jobs });
}

export const  updateUser = async(req, res) => {
  
    try {
        console.log(req.file);


        const newUser = {...req.body};
        delete newUser.password;
    
        if(req.file){
            const response = await cloudinary.uploader.upload(req.file.path);
            await fs.unlink(req.file.path);
    
            newUser.avatar =  response.secure_url
            newUser.avatarPublicId =  response.public_id
         
    
        }
        const updateUser = await User.findByIdAndUpdate(req.user.userId,newUser);
    
        if(req.file && updateUser.avatarPublicId){
            await cloudinary.uploader.destroy(updateUser.avatarPublicId);
        }
        
    
        res.json({ msg: 'Update user' });
    } catch (error) {
        res.status(300).json({ message: error.message });
    }
}