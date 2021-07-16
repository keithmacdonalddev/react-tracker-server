import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import './services/passport.js';
import connectDB from './config/db.js';
import setLogColors from './middleware/setLogColors.js';

// Route files
import userList from './routes/usersRoutes.js';
import loginRoute from './routes/loginRoute.js';
import ticketRoutes from './routes/ticketRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import friendsRoutes from './routes/friendsRoutes.js';
import registerRoutes from './routes/registerRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import singleProjectRoute from './routes/singleProjectRoute.js';

const app = express();
dotenv.config(); // Load env variables.

connectDB(); // Run database
setLogColors();

app.use(cors());
app.use(express.json());
// logging middleware during development
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

// Mount routers
app.use('/users', userList);
app.use('/login', loginRoute);
app.use('/tickets', ticketRoutes);
app.use('/profile', profileRoutes);
app.use('/comment', commentRoutes);
app.use('/friends', friendsRoutes);
app.use('/projects', projectRoutes);
app.use('/register', registerRoutes);
app.use('/activity', activityRoutes);
app.use('/project', singleProjectRoute);

app.get('/', function (req, res) {
	res.json('api started...');
});

// Initialize server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`.yellow.bold));
