import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { SchemaInitializer } from './databases/SchemaInitializer.js';
import generate from './controllers/GenerateController.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

const main = async () => {

    await SchemaInitializer.initializeSchema();
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

app.use('/generate', generate);

main();