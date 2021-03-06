/** @format */

import asyncHandler from 'express-async-handler';
import Project from '../models/projectModel.js';
import User from '../models/userModel.js';

export const newProject = asyncHandler(async (req, res) => {
	console.log(`Request reached newProject API, unpacking request data...`);

	const { projectNumber, title, description, category, status, priority, userInfo } = req.body;

	console.log(`unpacking request data complete: (${title}, ${description}, ${status}, ${userInfo}`);
	console.log('starting project.create()');

	const project = await Project.create({
		number: projectNumber,
		title,
		description,
		category,
		status,
		priority,
		owner: { id: userInfo._id, firstName: userInfo.firstName, lastName: userInfo.lastName },
	});

	if (project) {
		console.log(`New project created: ${project}`);
		console.log(`Sending project._id to projects owner: ${project.owner.id}`);
		console.log('Searching for user');
		const user = await User.findById(project.owner.id, function (err, user) {
			if (user) {
				console.log('User found, adding new project to users profile');
				user.projects = [...user.projects, project._id];
			} else if (err) {
				res.status(404).json('User not found');
			}

			res.status(201).json({ project, message: 'New project created successfully' });
		});
	}
});

export const getProjects = async (req, res) => {
	let currentUserProjects = [];

	const allProjects = await Project.find({});

	if (allProjects) {
		allProjects.map((project) => {
			console.log(`project owner: ${project.owner}`);
			JSON.stringify(project.owner.id) === JSON.stringify(req.params.id) && currentUserProjects.push(project);
		});
	}

	res.json(currentUserProjects);
};

export const getProject = async (req, res) => {
	const project = await Project.findOne({ _id: req.params.id });
	res.json(project);
};

export const deleteProject = async (req, res) => {
	console.log(`Request to delete project ${req.params.id}, received`);

	console.log(`Searching the database for project: ${req.params.id}`);
	const project = await Project.findById(req.params.id);

	if (project) {
		console.log(`Project found: deleting project ${project._id}`);

		await project.remove();

		res.json({ message: 'Project Removed' });
	} else {
		res.status(404);

		throw new Error('User not found');
	}
};

export const editProject = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	console.log(`req.params ${req.params.id}`);

	const { assigneeId } = req.body;

	const project = await Project.findById(req.params.id);

	if (project) {
		if (req.body.assigneeId) {
			project.assignee = [...project.assignee, assigneeId];
		}

		project.title = req.body.title || project.title;
		project.description = req.body.description || project.description;
		project.status = req.body.status || project.status;

		const updatedProject = await project.save();

		res.json({
			title: updatedProject.title,
			description: updatedProject.description,
			status: updatedProject.status,
			assignee: updatedProject.assignee,
		});
	} else {
		res.status(404);
		throw new Error('Ticket not found');
	}
});
