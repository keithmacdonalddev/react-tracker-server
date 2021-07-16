import mongoose from 'mongoose';

const logSchema = mongoose.Schema(
	{
		user: {
			type: String,
		},
		type: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		reason: {
			type: String,
			required: true,
		},
		data: { type: {} },
	},
	{
		timestamps: true, // mongoose allows a second argument of options, 'timestamps' auto populates fields: 'created at' & 'updated at'
	},
);

const Log = mongoose.model('Log', logSchema);

export default Log;
