import React, { useState, useEffect } from 'react';
import studentService from '../services/studentService';

interface Student {
    _id: string;
    name: string;
    email: string;
}

const StudentList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        studentService.getAll().then(response => {
            setStudents(response.data);
        });
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold">Students</h2>
            <ul className="list-disc list-inside">
                {students.map(student => (
                    <li key={student._id} className="mt-2">
                        {student.name} - {student.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;
