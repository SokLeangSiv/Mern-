
import { BadRequestError, UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJwt } from "../utils/jwtToken.js";

export const authenticateUser =  (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new UnauthenticatedError('Authentication invalid');
        }

        const { userId, role } = verifyJwt(token);

        const testUser = userId === '65eaf2635c945c559523bd86'

        req.user = { userId, role, testUser };
        next();
    } catch (error) {
        next(new UnauthenticatedError('Authentication invalid'));
    }
};

export const authorizePermission = (...roles) => {


    return (req,res,next)=>{

        if(!roles.includes(req.user.role)){
            throw new UnauthenticatedError('Not authorized to access this route');
        }

        next();
    }
}

export const checkForTestUser = (req,res,next)=>{

    if(req.user.testUser) throw new BadRequestError('Read Only');
    next();
}