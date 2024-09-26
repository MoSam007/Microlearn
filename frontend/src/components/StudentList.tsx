import { useEffect, useState } from 'react';

interface Student {
  _id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
}

export const StudentsList = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold">Students List</h1>
      <ul className="list-disc">
        {students.map((student) => (
          <li key={student._id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsList;