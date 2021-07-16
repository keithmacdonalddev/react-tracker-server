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
		Log.create({ logType: 'error', log: 'login attempt failed, email not found', data: { email: email } });
		res.status(401);
		throw new Error('email not found');
	}

	if (user && (await user.matchPassword(password))) {
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
		res.status(401);
		throw new Error('Invalid password');
	}
});
