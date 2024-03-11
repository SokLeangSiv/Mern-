import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import jobRouter from './routes/jobsRoute.js';
import moongoose from 'mongoose';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import {authenticateUser}  from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
//public

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));



if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, './public')));

app.use(errorHandlerMiddleware);


app.use(cookieParser());

app.use(express.json());


app.get('/api/v1/test', (req,res)=>{
    res.status(200).json({
        message: "Hello from the server"
    })
})

app.use('/api/v1/jobs',authenticateUser, jobRouter);

app.use('/api/v1/users',authenticateUser, userRouter);

app.use('/api/v1/auth', authRouter);

app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})

app.use('*',(req,res)=>{
    res.status(404).json({
        message: "Route not found"
    })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: `${err.message}`
    });
});



const port = process.env.PORT || 5000;


try{
    await moongoose.connect(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log(`Server is running on port ${port} `);
    });
    
}catch(err){
    console.log(err);
    process.exit(1);
}

