import express from 'express';
import { authUser } from '../controllers/loginRouteController.js';

const router = express.Router();

router.route('/').post(authUser);

export default router;

// import { getUserProfile, registerUser } from '../controllers/userController.js';
// import { protect } from '../middleware/authMiddleware.js';
