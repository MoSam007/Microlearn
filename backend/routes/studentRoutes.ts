import express from 'express';
import Student from '../models/student';
import path from 'path';
import multer from 'multer';

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

// Set storage engine for multer
const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/'); // Folder where images will be saved
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
  
  // Set up file filtering for image files
  function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Images only!'));
    }
  }
  
  // Set up multer middleware
  const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  });
  
  // Upload route
  router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      const filePath = `/uploads/${req.file?.filename}`;
      // Store the image file path in the database, for example with a student:
      const student = await Student.findById(req.body.studentId);
      if (student) {
        student.image = filePath;
        await student.save();
        res.json({ message: 'Image uploaded and saved', filePath });
      } else {
        res.status(404).json({ message: 'Student not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

export default router;
