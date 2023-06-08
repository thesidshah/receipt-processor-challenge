import express from 'express';
// import cors from 'cors';

//controller
import recieptController from './controller/recieptController.js';

const app = express();
app.use(express.json());
// app.use(cors());

recieptController(app);

app.listen(process.env.PORT ||4000);