import express from 'express';
import {
	getProject,
	deleteProject,
	editProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:id').get(protect, getProject);
router.route('/:id').delete(protect, deleteProject);
router.route('/:id').put(editProject);

export default router;
