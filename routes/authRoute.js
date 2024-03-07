import { Router } from 'express';
import { validateLoginInput, validateRegisterInput } from '../middleware/validationMiddleware.js';
const router = Router();

import { register, login, logout } from '../controller/authController.js';

router.route('/register').post(validateRegisterInput,register);
router.route('/login').post(validateLoginInput, login);
router.route('/logout').get(logout);

export default router;