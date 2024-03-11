import { Router } from "express";
import {
  validateLoginInput,
  validateUpdateUserInput,
} from "../middleware/validationMiddleware.js";
const router = Router();

import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controller/userController.js";
import { authorizePermission, checkForTestUser } from "../middleware/authMiddleware.js";

import upload from "../middleware/multerMiddleware.js";

router.route("/current-user").get(getCurrentUser);
router
  .route("/admin/app-stats")
  .get(authorizePermission("admin"), getApplicationStats);
router
  .route("/update-user")
  .patch(checkForTestUser,upload.single("avatar"), validateUpdateUserInput, updateUser);

export default router;
