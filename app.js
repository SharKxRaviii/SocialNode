import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/features/user/user.routes.js';
import { appErrorHandlerMiddleware } from './src/middlewares/appErrorHandler.js';


const app = express();

app.use(express.json());

dotenv.config();

app.get('/', (req, res) => {
    res.send('Welcome to PostAway-II Project');
});

app.use('/api/users', userRoutes);



app.use(appErrorHandlerMiddleware);
export default app
