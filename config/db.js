/** @format */

import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.CONNECTION_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`.rainbow.underline);
	} catch (error) {
		console.log(`Error: ${error.message}`.red.underline.bold);

		// exit(1 = 'with failure')
		process.exit(1);
	}
};

export default connectDB;
