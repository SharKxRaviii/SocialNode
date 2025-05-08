import express from 'express';
import userRoutes from './src/features/user/user.routes.js';
import { appErrorHandlerMiddleware } from './src/middlewares/appErrorHandler.middleware.js';


const app = express();

app.use(express.json());





app.get('/', (req, res) => {
    res.send('Welcome to PostAway-II Project');
});

app.use('/api/users', userRoutes);



app.use(appErrorHandlerMiddleware);
export default app
