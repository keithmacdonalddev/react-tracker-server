import express from 'express';
import {
	friendRequest,
	cancelRequest,
	cancelRequestB,
	friendRequestB,
	approveRequest,
	approveRequestB,
} from '../controllers/friendsController.js';

const router = express.Router();

router.route('/request').put(friendRequest);
router.route('/requestB').put(friendRequestB);
router.route('/cancel').put(cancelRequest);
router.route('/cancelB').put(cancelRequestB);
router.route('/approve').put(approveRequest);
router.route('/approveB').put(approveRequestB);

export default router;
