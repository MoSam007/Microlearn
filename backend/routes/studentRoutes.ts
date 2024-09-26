import express from 'express';
import Student from '../models/student';

const router = express.Router();

// @route GET /api/students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve students' });
    }
});

// @route POST /api/students
router.post('/', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.json(savedStudent);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add student' });
    }
});

export default router;
