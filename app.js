import express from 'express';
import userRoutes from './src/features/user/user.routes.js';
import { appErrorHandlerMiddleware } from './src/middlewares/appErrorHandler.middleware.js';
import { loggerMiddleware } from './src/middlewares/logger.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

// cookie-parser
app.use(cookieParser());

app.use(express.json());

// logger middleware
app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to PostAway-II Project');
});

app.use('/api/users', userRoutes);



app.use(appErrorHandlerMiddleware);
export default app
