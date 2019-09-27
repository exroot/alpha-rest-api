import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Routes
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';
import oddRoutes from './routes/oddRoutes';

const app = express();
const PORT = 3000;

// Core middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res, next) => {
    res.write('<h1>hello world</h1>');
    res.end();
    next();
});

// Routes middleware
app.use(authRoutes);
app.use(noteRoutes);
app.use(oddRoutes);

app.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`);
});
