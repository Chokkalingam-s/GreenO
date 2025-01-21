import { useState, useEffect } from 'react';
import axios from 'axios';

export default function InComplete() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncompleteStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/incomplete', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStudents(response.data);
      } catch (err) {
        setError('Failed to fetch incomplete students.');
      } finally {
        setLoading(false);
      }
    };

    fetchIncompleteStudents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Incomplete Uploads</h1>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Register Number</th>
            <th>Student Name</th>
            <th>Department</th>
            <th>Current Semester</th>
            <th>Current Year</th>
            <th>Upload Count</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.sno}>
              <td>{student.sno}</td>
              <td>{student.regNo}</td>
              <td>{student.name}</td>
              <td>{student.department}</td>
              <td>{student.currentSemester}</td>
              <td>{student.currentYear}</td>
              <td>{student.uploadCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
