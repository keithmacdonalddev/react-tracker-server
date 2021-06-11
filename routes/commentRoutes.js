/** @format */

import express from 'express';
import { createComment, deleteComment } from '../controllers/commentController.js';
// import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/create/:id').put(createComment);
router.route('/delete').put(deleteComment);

export default router;
