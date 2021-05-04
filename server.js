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
app.use('/api/tickets', ticketRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/login', userRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/project', singleProjectRoute);
app.use('/api/users', userList);
app.use('/api/friends', friendsRoutes);
// app.use('/api/logs', newLog);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Initialize server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`.yellow.bold));
