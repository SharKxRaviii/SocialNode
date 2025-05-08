import app from './app.js';
import dotenv from 'dotenv';
import {connectToDB} from './src/db_config/mongodb.js';

dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`Server is listening to ${process.env.PORT}`);
    connectToDB();
});