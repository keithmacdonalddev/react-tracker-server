import express from 'express';
import {
	getTicketById,
	getTicketsByOwnerId,
	getTickets,
	updateTicket,
	createTicket,
	deleteTicket,
} from '../controllers/ticketController.js';

const router = express.Router();

router.route('/').get(getTickets).post(createTicket);

router.route('/:id').get(getTicketById).put(updateTicket).delete(deleteTicket);

router.route('/owner/:id').get(getTicketsByOwnerId);

export default router;
