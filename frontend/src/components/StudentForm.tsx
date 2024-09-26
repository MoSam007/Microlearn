import React, { useState } from 'react';
import studentService from '../services/studentService';

const StudentForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        studentService.create({ name, email }).then(() => {
            alert('Student added successfully');
            setName('');
            setEmail('');
        });
    };

    return (
        <form onSubmit={handleSubmit} className="container mx-auto p-4">
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 p-2 block w-full rounded border-gray-300"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 p-2 block w-full rounded border-gray-300"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Student
            </button>
        </form>
    );
};

export default StudentForm;
