'use client';
import { useState, useEffect } from 'react';
import { getBalance } from '../../services/feeService';
import { getGrades, getAttendance } from '../../services/academicService';

export default function Overview() {
  const [balance, setBalance] = useState<number>(0);
  const [attendanceRate, setAttendanceRate] = useState<string>('--');
  const [gpa, setGpa] = useState<string>('--');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Fetch financial data
      const balRes = await getBalance();
      setBalance(balRes.balance);

      // Fetch grades to calculate GPA
      const grades = await getGrades();
      const validGrades = grades.filter((g: any) => g.score > 0);
      if (validGrades.length > 0) {
        const avgScore = validGrades.reduce((sum: number, g: any) => sum + g.score, 0) / validGrades.length;
        if (avgScore >= 90) setGpa('A');
        else if (avgScore >= 80) setGpa('B');
        else if (avgScore >= 70) setGpa('C');
        else if (avgScore >= 60) setGpa('D');
        else setGpa('F');
      }

      // Fetch attendance to calculate percentage
      const attendance = await getAttendance();
      if (attendance.length > 0) {
        const presentDays = attendance.filter((a: any) => a.status === 'Present').length;
        const rate = Math.round((presentDays / attendance.length) * 100);
        setAttendanceRate(`${rate}%`);
      }

    } catch (err) {
      console.error('Failed to load dashboard overview stats', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    { 
       title: 'Account Balance', 
       value: `${balance.toLocaleString()} RWF`, 
       status: balance < 0 ? 'Outstanding Fees' : 'Cleared' 
    },
    { title: 'Attendance', value: attendanceRate, status: 'Year to date' },
    { title: 'Grades', value: gpa, status: 'Overall Average' }
  ];

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className={`text-sm mt-1 font-medium ${stat.status === 'Outstanding Fees' ? 'text-red-600' : 'text-gray-500'}`}>{stat.status}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Notices</h3>
        <div className="space-y-3">
          {balance < 0 && (
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-800">Fee Payment Reminder</span>
              <span className="text-sm text-red-600 font-medium">Overdue Account</span>
            </div>
          )}
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-800">End of Term Examinations</span>
            <span className="text-sm text-gray-600 font-medium">Starting next week</span>
          </div>
        </div>
      </div>
    </div>
  );
}