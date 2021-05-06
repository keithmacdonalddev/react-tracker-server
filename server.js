import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import setLogColors from './middleware/setLogColors.js';
import googleRoutes from './routes/authRoutes.js';
import './services/passport.js';
// Route files
import ticketRoutes from './routes/ticketRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import registerRoutes from './routes/registerRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import singleProjectRoute from './routes/singleProjectRoute.js';
import projectRoutes from './routes/projectRoutes.js';
import userList from './routes/usersRoutes.js';
import friendsRoutes from './routes/friendsRoutes.js';
// import newLog from './routes/logRoutes.js';

const app = express();

setLogColors();
googleRoutes(app);

// Load env variables
dotenv.config();

// Run database
connectDB();

app.use(express.json());

// Development logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Mount routers
app.use('/tickets', ticketRoutes);
app.use('/comment', commentRoutes);
app.use('/login', userRoutes);
app.use('/register', registerRoutes);
app.use('/profile', profileRoutes);
app.use('/projects', projectRoutes);
app.use('/project', singleProjectRoute);
app.use('/users', userList);
app.use('/friends', friendsRoutes);
// app.use('/api/logs', newLog);

// app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
	res.json('api started...');
});

// Initialize server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`.yellow.bold));
