import React from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

const App: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-8">Tech Academy ERP</h1>
            <StudentForm />
            <StudentList />
        </div>
    );
};

export default App;
