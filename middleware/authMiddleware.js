
import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJwt } from "../utils/jwtToken.js";

export const authenticateUser =  (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new UnauthenticatedError('Authentication invalid');
        }

        const { userId, role } = verifyJwt(token);
        req.user = { userId, role };
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