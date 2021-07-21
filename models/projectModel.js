import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
	{
		number: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		priority: {
			type: String,
			required: true,
		},

		members: [
			{
				id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
				firstName: { type: String, ref: 'User' },
				LastName: { type: String, ref: 'User' },
			},
		],
		manager: {
			id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
			firstName: { type: String, required: true, ref: 'User' },
			lastName: { type: String, required: true, ref: 'User' },
		},
	},
	{
		timestamps: true, // mongoose allows a second argument of options, 'timestamps' auto populates fields: 'created at' & 'updated at'
	},
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
