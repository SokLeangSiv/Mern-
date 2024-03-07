import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/contants.js";

const jobSchema = new mongoose.Schema({
    company: String,
    position: String,
    jobStatus:{
        type:String,
        enum: Object.values(JOB_STATUS),
        default: 'pending'
    },
    jobType:{
        type:String,
        enum: Object.values(JOB_TYPE),
        default: 'full-time'
    },
    jobLocation: {
        type:String,
        default: 'my city'

    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true
}
);
export default mongoose.model('Job', jobSchema);