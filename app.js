import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/features/user/user.routes.js';


const app = express();

app.use(express.json());

dotenv.config();

app.get('/', (req, res) => {
    res.send('Welcome to PostAway-II Project');
});

app.use('/api/users', userRoutes);

export default app
