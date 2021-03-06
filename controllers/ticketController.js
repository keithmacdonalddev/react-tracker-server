/** @format */

import asyncHandler from 'express-async-handler';
import Ticket from '../models/ticketModel.js';

export const getTickets = asyncHandler(async (req, res, next) => {
	const tickets = await Ticket.find({});
	res.json(tickets);
});

export const getTicketsByOwnerId = asyncHandler(async (req, res, next) => {
	const tickets = await Ticket.find({});
	const { id } = req.params;

	const ticketsByOwnerId = tickets.filter((ticket) => {
		const ticketId = ticket.submittedBy.toString();

		if (ticketId === id) {
			return ticket;
		}
	});

	res.json(ticketsByOwnerId);
});

export const getTicketById = asyncHandler(async (req, res, next) => {
	const ticket = await Ticket.findById(req.params.id);
	res.json(ticket);
});

export const createTicket = asyncHandler(async (req, res, next) => {
	const { newTicket } = req.body;
	const { ticketType, title, description, assignedTo, priority, localProject, status, submittedBy } = newTicket;
	const ticket = await Ticket.create({
		ticketType: ticketType,
		title: title,
		description: description,
		assignedTo: assignedTo,
		priority: priority,
		project: localProject,
		status: status,
		submittedBy: submittedBy,
	});

	if (ticket) {
		res.status(201).json({
			ticketType: ticketType,
			title: title,
			description: description,
			assignedTo: assignedTo,
			priority: priority,
			project: localProject,
			status: status,
			submittedBy: submittedBy,
		});
	} else {
		res.status(400);
		throw new Error('invalid user');
	}
});

export const updateTicket = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	const ticket = await Ticket.findById(req.params.id);
	if (ticket) {
		ticket.title = req.body.title || ticket.title;
		ticket.description = req.body.description || ticket.description;
		ticket.assignedTo = req.body.developer || ticket.assignedTo;
		ticket.project = req.body.project || ticket.project;
		ticket.priority = req.body.priority || ticket.priority;
		ticket.status = req.body.status || ticket.status;
		ticket.updatedBy = req.body.updatedBy || ticket.updatedBy;

		const updatedTicket = await ticket.save();
		res.json({
			title: updatedTicket.title,
			description: updatedTicket.description,
			developer: updatedTicket.assignedTo,
			project: updatedTicket.project,
			priority: updatedTicket.priority,
			status: updatedTicket.status,
			updatedBy: updatedTicket.updatedBy,
		});
	} else {
		res.status(404);
		throw new Error('Ticket not found');
	}
});

export const deleteTicket = asyncHandler(async (req, res, next) => {
	const ticket = await Ticket.findById(req.params.id);
	if (ticket) {
		await ticket.remove();
		res.json({ message: 'Ticket Removed' });
	} else {
		res.status(404);
		throw new Error('Ticket not found');
	}
});
