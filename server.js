import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import router from './routes.js'
import bodyParser from 'body-parser';
dotenv.config();

const app = express(); 

// middleware 
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json()) 

app.use('/api', router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, (  ) => {
    console.log(`server listening on port ${PORT}`);
})