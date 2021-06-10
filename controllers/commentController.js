/** @format */
import asyncHandler from 'express-async-handler';
import Ticket from '../models/ticketModel.js';

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
export const createComment = asyncHandler(async (req, res) => {
	console.log('from createComment');
	const ticket = await Ticket.findById(req.params.id);
	console.log(`ticket *********** ${JSON.stringify(ticket)} *************`);
	const { newComment } = req.body;
	const { userInfo } = newComment;
	const { firstName, lastName } = userInfo;
	const name = `${firstName} ${lastName}`;
	const { comment } = newComment;

	if (ticket) {
		ticket.comments.push({ name, comment });

		const updatedTicket = await ticket.save();

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
