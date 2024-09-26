import { Request, Response } from 'express';
import Course from '../models/course';

export const  getCourses = async (req: Request, res: Response) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const addCourse = async (req: Request, res: Response) => {
    try {
        const { title, description, instructor } = req.body;
        const course = new Course({ title, description, instructor });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: 'Error adding course' });
    }
};
