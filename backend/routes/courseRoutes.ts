import express from 'express';
import Course from '../models/course';

const router = express.Router();

// @route GET /api/courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve courses' });
    }
});

// @route POST /api/courses
router.post('/', async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        const savedCourse = await newCourse.save();
        res.json(savedCourse);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add course' });
    }
});

export default router;
