import app from './app.js';
import {connectToDB} from './src/db_config/mongodb.js';

app.listen(process.env.PORT, () => {
    console.log(`Server is listening to ${process.env.PORT}`);
    connectToDB();
});