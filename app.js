import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import e from 'express';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/IST256Solo2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoCreate: true
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

app.use('/users', userRouter);
app.use('/blogs', blogRouter);

//Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, 'frontend'), {
    //Set content type explicitly for .js files
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.type('Content-Type', 'application/javascript');
        }
    }
}));

//Define the route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/index.html'));
});

app.listen(port, () => {
    console.log('Server is running');
});