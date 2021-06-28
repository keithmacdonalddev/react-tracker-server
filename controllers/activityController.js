import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Create new log
// @route   POST /api/logs
// @access  Public
const newActivity = asyncHandler(async (req, res, next) => {
	const { event, details } = req.body;
	const user = await User.findById(req.params.id);

	if (user) {
		user.activity.push({ event, details });
		const updatedUserActivity = await user.save();
		res.status(200).json(user.activity);
	} else {
		console.log(`user: ${req.params.id} not found`);

		res.status(404);
		throw new Error('User not found');
	}
});

const getAllActivity = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (user) {
		res.status(200).json(user.activity);
	}

	res.status(404);
	throw new Error('User not found');
});

export { newActivity, getAllActivity };
