import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Log from '../models/activityModel.js';
import generateToken from '../utils/generateToken.js';

// Authorize user and get token
// POST /login
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		Log.create({ type: 'LoginAttempt', status: 'failed', reason: 'email not found', data: { email: email } });
		res.status(401);
		throw new Error('email not found');
	}

	if (user && (await user.matchPassword(password))) {
		Log.create({
			type: 'LoginAttempt',
			status: 'success',
			reason: '',
			data: { email: user.email },
		});
		console.log('success login');

		res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			username: user.username,
			idAdmin: user.isAdmin,
			loggedIn: true,
			avatar: user.avatar,
			token: generateToken(user._id),
		});
	} else {
		Log.create({ type: 'LoginAttempt', status: 'failed', reason: 'invalid password', data: { email: email } });

		res.status(401);
		throw new Error('Invalid password');
	}
});
