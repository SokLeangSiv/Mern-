import { Router } from "express";

const router = Router();

import {
  getAllJobs,
  createJob,
  getOneJob,
  updateJob,
  deleteJob,
  showStats
} from "../controller/jobController.js";
import {
  validateIdParam,
  validateJobInput,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

router.route("/").get(getAllJobs).post(checkForTestUser,validateJobInput, createJob);

router.route('/stats').get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getOneJob)
  .patch(checkForTestUser,validateJobInput, updateJob)
  .delete(checkForTestUser,deleteJob);

export default router;
