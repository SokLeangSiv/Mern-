import { body, validationResult } from 'express-validator';
import { BadRequestError, UnauthenticatedError, UnauthorizedError } from '../errors/customErrors.js';
import { param } from 'express-validator';
import Job from '../model/jobModel.js';
import User from '../model/userModel.js';
import mongoose from 'mongoose';



const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
    
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
    
        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages);
        }
    
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }
    
        throw new BadRequestError(errorMessages);
      }
    
      next();
    }
  ];
};

export const validateIdParam = withValidationErrors([

  param('id').custom(async (value, {req}) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
  
    if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
    const job = await Job.findById(value);
  
    if (!job) throw new NotFoundError(`no job with id ${value}`);

    

    const isAdmin = req.user.role === 'admin';  
    const isOwner = req.user.userId === job.createdBy.toString();

    if(!isAdmin && !isOwner) throw new UnauthorizedError('you are not authorized to perform this action');
  })
]);

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('position is required'),
  body('jobLocation').notEmpty().withMessage('job location is required'),
  body('jobStatus')
    .isIn(['interviewed','declined','pending'])
    .withMessage('invalid status value'),
  body('jobType').isIn(['full-time','part-time','intership']).withMessage('invalid job type'),
]);


export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage("name is required"),
  body('email').notEmpty().withMessage("email is required").custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user) {
      return Promise.reject('E-mail already in use');
    }
  }),
  
  body('password').notEmpty().withMessage("password is required"),
  body('location').notEmpty().withMessage("location is required")
])


export const validateLoginInput = withValidationErrors([
  body('email').notEmpty().withMessage("email is required"),
  body('password').notEmpty().withMessage("password is required")
]);


export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
]);
