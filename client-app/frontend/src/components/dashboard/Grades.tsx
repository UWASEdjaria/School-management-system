'use client';
import { useState, useEffect } from 'react';
import { getGrades } from '../../services/academicService';

interface Grade {
  id: number;
  subject: string;
  score: number;
  grade: string;
  comments: string;
  Teacher: {
    firstName: string;
    lastName: string;
  };
}

export default function Grades() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAcademicData = async () => {
    try {
      const data = await getGrades();
      setGrades(data);
    } catch (err) {
      setError('Unable to fetch academic records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAcademicData();
  }, []);

  const validGrades = grades.filter(g => g.score > 0);
  const average = validGrades.length > 0 
    ? Math.round(validGrades.reduce((sum, g) => sum + g.score, 0) / validGrades.length)
    : 0;

  const getGradeColor = (grade: string) => {
    if (!grade) return 'text-gray-600';
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    if (grade.startsWith('D')) return 'text-orange-600';
    return 'text-red-600'; // F or others
  };

  if (loading) return <div>Loading academic records...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Academic Performance</h2>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-900">Grade Report</h3>
        </div>

        {grades.length === 0 ? (
           <p className="text-gray-500 italic my-6">No grades have been posted yet.</p>
        ) : (
          <>
            {average > 0 && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{average}%</div>
                  <div className="text-gray-600">Overall Average</div>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="py-3 px-4 font-semibold text-gray-700">Subject</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Teacher</th>
                    <th className="py-3 px-4 font-semibold text-gray-700 text-center">Score</th>
                    <th className="py-3 px-4 font-semibold text-gray-700 text-center">Letter Grade</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((grade) => (
                    <tr key={grade.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{grade.subject}</td>
                      <td className="py-3 px-4 text-gray-600">
                         {grade.Teacher ? `${grade.Teacher.firstName} ${grade.Teacher.lastName}` : 'Unassigned'}
                      </td>
                      <td className="py-3 px-4 text-center font-bold">
                        {grade.score > 0 ? `${grade.score}%` : 'N/A'}
                      </td>
                      <td className={`py-3 px-4 text-center font-bold text-lg ${getGradeColor(grade.grade)}`}>
                        {grade.grade || '-'}
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-sm italic">{grade.comments || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}