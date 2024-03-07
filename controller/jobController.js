import Job from '../model/jobModel.js';

export const getAllJobs = async (req,res)=>{




    try{

        req.user.createdBy = req.user.userId;
        const jobs = await Job.find({createdBy: req.user.userId});
        res.status(200).json({
            message: "Data received successfully!",
            jobs 
        })
    }catch(err){
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

export const createJob = async (req,res)=>{

    
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)

    res.status(201).json({
        message: "Data received successfully!",
        job
    })
}

export const getOneJob = async (req,res)=>{
    try{
        const {id} = req.params;
        const job = await Job.findById(id);

    if(!job){
        return res.status(404).json({
            message: "Job not found with this id"
        })
    }

    res.status(200).json({
        message: "Data received successfully!",
        job
    })
    }catch(err){
        res.status(500).json({
            message: err
        })
    }
}

export const updateJob = async (req,res)=>{
    const {id} = req.params;
    
    const updateJob = await Job.findByIdAndUpdate(id,req.body, {new: true});

    if(!updateJob){
        return res.status(404).json({
            message: "Job not found with this id"
        })
    }

    res.status(200).json({
        message: "Data updated successfully!",
        updateJob
    })
}

export const deleteJob = async (req,res)=>{

    const {id} = req.params;
    const removeJob = await Job.findByIdAndDelete(id);

    if(!removeJob){
        return res.status(404).json({
            message: "Job not found with this id"
        })
    }


    res.status(200).json({
        message: "Job deleted successfully!",
        job: removeJob
    })
}