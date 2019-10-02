import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './database';
import morgan from 'morgan';

const app = express();
const PORT = process.env.APP_PORT;

// Importing models
import User from './models/User';
import Note from './models/Note';

// Importing routes
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';
import oddRoutes from './routes/oddRoutes';

// Core middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Associations
User.hasMany(Note);
Note.belongsTo(User);

// Routes middlewares
app.use('/auth', authRoutes);
app.use('/api', noteRoutes);
app.use(oddRoutes);
app.use((err, req, res, next) => {
    return res.status(err.statusCode).json({ data: err.data });
});

sequelize
    .sync()
    .then(() =>
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    )
    .catch((err) => console.log(err));
