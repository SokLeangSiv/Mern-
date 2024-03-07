import jwt from "jsonwebtoken";

export const createJwt= (payload)=>{
    const token = jwt.sign(payload, process.env.JWT_SECRET,{
         
        expiresIn : process.env.JWT_EXPIRE
    })
    return token;
}

export const verifyJwt = (token)=>{

    const decode  = jwt.verify(token,process.env.JWT_SECRET);

    return  decode;
}