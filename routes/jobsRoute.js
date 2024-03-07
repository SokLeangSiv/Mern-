import { Router } from "express";

const router = Router();

import{getAllJobs, createJob, getOneJob, updateJob, deleteJob} from '../controller/jobController.js';
import{validateIdParam, validateJobInput} from '../middleware/validationMiddleware.js';

router.route('/').get(getAllJobs).post(validateJobInput,createJob);
router.route('/:id').get(validateIdParam,getOneJob).patch(validateJobInput,updateJob).delete(deleteJob);

export default router;