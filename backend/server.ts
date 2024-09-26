import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import studentRoutes from './routes/studentRoutes';
import courseRoutes from './routes/courseRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
