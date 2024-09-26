import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from './models/student';
import Course from './models/course';
import students from './data/students.json';
import courses from './data/courses.json';
import { ICourse } from './models/course';

dotenv.config();  // Load environment variables

console.log('MONGO_URI:', process.env.MONGO_URI);

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

// Seed function to load data into the database
const seedData = async () => {
    try {
        // Clear existing data
        await Student.deleteMany();
        await Course.deleteMany();

        // Insert courses and store their MongoDB-generated ObjectIds
        const createdCourses = await Course.insertMany(courses) as ICourse[];
        console.log('Courses added!');

        // Map course titles to the created course ObjectIds
        const courseMap: Record<string, mongoose.Types.ObjectId> = {};
        createdCourses.forEach((course: ICourse) => {
            courseMap[course.title] = course._id;
        });

        // Map course titles in students.json to MongoDB course ObjectIds
        const studentsWithCourseIds = students.map((student) => ({
            ...student,
            enrolledCourses: student.enrolledCourses.map((courseId: string) => courseMap[courseId])
        }));

        // Insert students
        await Student.insertMany(studentsWithCourseIds);
        console.log('Students added!');

        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

// Connect to the database and seed the data
connectDB().then(() => seedData());
