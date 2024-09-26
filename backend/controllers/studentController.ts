import { Request, Response } from 'express';
import Student from '../models/student';

export const getStudents = async (req: Request, res: Response) => {
    try {
        const students = await Student.find().populate('enrolledCourses');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const addStudent = async (req: Request, res: Response) => {
    try {
        const { name, email, enrolledCourses } = req.body;
        const student = new Student({ name, email, enrolledCourses });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: 'Error adding student' });
    }
};
