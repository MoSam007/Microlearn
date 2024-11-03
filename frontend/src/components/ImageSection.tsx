const StudentProfile = ({ student }: { student: any }) => {
    return (
      <div>
        <h1>{student.name}</h1>
        {student.image && (
          <img
            src={`http://localhost:5000${student.image}`}
            alt={student.name}
            width="200"
            height="200"
          />
        )}
      </div>
    );
  };
  
  export default StudentProfile;