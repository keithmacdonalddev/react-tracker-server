import express from 'express';
import { newActivity, getAllActivity } from '../controllers/activityController.js';

const router = express.Router();

router.route('/create/:id').put(newActivity);
router.route('/:id').get(getAllActivity);

export default router;
