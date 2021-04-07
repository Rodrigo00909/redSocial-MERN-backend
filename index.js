// Imports
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/post.js';

// BD
const app = express();

// middleware
app.use('/post', postRoutes); // cada ruta dentro post.js empieza con post www.----/post

app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());

// mongodb atlas
const CONNECTION_URL = 'mongodb+srv://messenzani01:21RodrigoM@cluster0.8wt95.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

// conectar mongoose
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Servidor conectado en: ${PORT}`))) // Success connection
    .catch((error) => console.log(error.message)) // Error connection

mongoose.set('useFindAndModify', false);