import { StatusCodes } from "http-status-codes";
import User from "../model/userModel.js";
import Job from "../model/jobModel.js";
import cloudinary from 'cloudinary';
import { formatImage } from '../middleware/multerMiddleware.js';
import {promises as fs} from 'fs';

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



export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};