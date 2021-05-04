import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const friendRequest = asyncHandler(async (req, res, next) => {
	const { friendObj, loggedUserObj } = req.body;

	try {
		console.log('************* in the try catch *************');
		const user = await User.findByIdAndUpdate(friendObj.id, {
			$push: {
				pendingRequests: loggedUserObj.id,
				received: loggedUserObj.id,
			},
		});
		if (user) {
			res.send(user);
		}
	} catch (err) {
		res.send(err);
	}
});

export const friendRequestB = asyncHandler(async (req, res, next) => {
	const { loggedUserObj, friendObj } = req.body;

	try {
		const user = await User.findByIdAndUpdate(loggedUserObj.id, {
			$push: {
				pendingRequests: friendObj.id,
				sent: friendObj.id,
			},
		});
		if (user) {
			res.send(user);
		}
	} catch (err) {
		res.send(err);
	}
});

export const cancelRequest = asyncHandler(async (req, res, next) => {
	const { friend, loggedInUser } = req.body;
	const user = await User.findById(friend);

	const resultingArray = user.pendingRequests.filter((request) => {
		if (!(request === loggedInUser)) {
			return request;
		}
	});
	const sentArray = user.sent.filter((request) => {
		if (!(request === loggedInUser)) {
			return request;
		}
	});
	const receivedArray = user.received.filter((request) => {
		if (!(request === loggedInUser)) {
			return request;
		}
	});

	user.pendingRequests = [...resultingArray];
	user.sent = [...sentArray];
	user.received = [...receivedArray];

	const updatedFriend = await user.save();
	if (updatedFriend) {
		console.log('friend data updated');
		res.status(200).json({
			updatedFriend,
		});
	} else {
		res.status(400);
		throw new Error('error');
	}
});

export const cancelRequestB = asyncHandler(async (req, res, next) => {
	const { loggedInUser, friend } = req.body;
	const user = await User.findById(loggedInUser);

	const resultingArray = user.pendingRequests.filter((request) => {
		if (!(request === friend)) {
			return request;
		}
	});
	const sentArray = user.sent.filter((request) => {
		if (!(request === friend)) {
			return request;
		}
	});
	const receivedArray = user.received.filter((request) => {
		if (!(request === friend)) {
			return request;
		}
	});

	user.pendingRequests = [...resultingArray];
	user.sent = [...sentArray];
	user.received = [...receivedArray];

	const updatedLoggedInUser = await user.save();

	if (updatedLoggedInUser) {
		console.log('loggedInUser data updated');

		res.status(200).json({
			updatedLoggedInUser,
		});
	} else {
		res.status(400);
		throw new Error('error');
	}
});

export const approveRequest = asyncHandler(async (req, res, next) => {
	const { friend, loggedInUser } = req.body;

	try {
		console.log('************* in the try catch *************');
		const user = await User.findByIdAndUpdate(friend, {
			$push: {
				friends: loggedInUser,
			},
		});
		if (user) {
			res.send(user);
		}
	} catch (err) {
		res.send(err);
	}
});

export const approveRequestB = asyncHandler(async (req, res, next) => {
	const { loggedInUser, friend } = req.body;

	try {
		console.log('************* in the try catch *************');
		const user = await User.findByIdAndUpdate(loggedInUser, {
			$push: {
				friends: friend,
			},
		});
		if (user) {
			res.send(user);
		}
	} catch (err) {
		res.send(err);
	}
});
