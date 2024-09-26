import { useState } from 'react';

interface Student {
  name: string;
  email: string;
  enrolledCourses: string[];
}

export const StudentForm = () => {
  const [student, setStudent] = useState<Student>({
    name: '',
    email: '',
    enrolledCourses: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        const addedStudent = await response.json();
        console.log('Added student:', addedStudent);
      } else {
        console.error('Failed to add student');
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <form className="container mx-auto p-4" onSubmit={handleSubmit}>
      <h1 className="text-xl font-bold">Add Student</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          className="border p-2 w-full"
          type="text"
          name="name"
          value={student.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          className="border p-2 w-full"
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add Student
      </button>
    </form>
  );
};

export default StudentForm;