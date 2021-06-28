import express from 'express';
import { newProject, getProjects } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, newProject);
router.route('/:id').get(protect, getProjects);

export default router;
