/** @format */

import asyncHandler from 'express-async-handler';
import Project from '../models/projectModel.js';

export const newProject = asyncHandler(async (req, res) => {
	const { title, description, status, id } = req.body;

	const project = await Project.create({
		title,
		description,
		status,
		administrator: id,
	});
	if (project) {
		res.json({
			project,
		});
	}
});

export const getProjects = async (req, res) => {
	const projects = await Project.find({});
	res.json(projects);
};

export const getProject = async (req, res) => {
	const project = await Project.findOne({ _id: req.params.id });
	res.json(project);
};

export const deleteProject = async (req, res) => {
	const project = await Project.findById(req.params.id);

	if (project) {
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
	const project = await Project.findById(req.params.id);
	if (project) {
		project.title = req.body.title || project.title;
		project.description = req.body.description || project.description;
		project.status = req.body.status || project.status;

		const updatedProject = await project.save();
		res.json({
			title: updatedProject.title,
			description: updatedProject.description,
			status: updatedProject.status,
		});
	} else {
		res.status(404);
		throw new Error('Ticket not found');
	}
});
