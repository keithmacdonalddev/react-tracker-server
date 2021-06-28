/** @format */
import asyncHandler from 'express-async-handler';
import Ticket from '../models/ticketModel.js';

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
export const createComment = asyncHandler(async (req, res) => {
	const { newComment } = req.body;
	const { userInfo } = newComment;
	const { firstName, lastName } = userInfo;
	const name = `${firstName} ${lastName}`;
	const { comment } = newComment;

	const addCommentToThisTicket = await Ticket.findById(req.params.id);

	if (addCommentToThisTicket) {
		addCommentToThisTicket.comments.push({ name, comment });

		const updatedTicket = await addCommentToThisTicket.save();

		console.log('update complete, sending data to client');
		res.json({
			updatedTicket,
		});
	} else {
		console.log(`ticket: ${req.params.id} not found`);

		res.status(404);
		throw new Error('Ticket not found');
	}
});

export const deleteComment = asyncHandler(async (req, res) => {
	const { ticketId, commentId } = req.body;
	console.log(`ticketId: ${ticketId}`);
	console.log(`commentId: ${commentId}`);

	const ticket = await Ticket.findByIdAndUpdate(ticketId, { $pull: { comments: { _id: commentId } } });

	console.log(`ticket: ${ticket}`);
	res.json({ ticket });
});
