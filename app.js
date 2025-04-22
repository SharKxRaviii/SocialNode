import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Welcome to PostAway-II Project');
});

server.listen(process.env.PORT, () => {
    console.log(`Server is listening to ${process.env.PORT}`);
});