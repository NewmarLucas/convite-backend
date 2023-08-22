import dotenv from 'dotenv';
import app from './app';
import './database/index';

dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3000}`);

app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));
