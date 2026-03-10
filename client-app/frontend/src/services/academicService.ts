import api from '../utils/api';

export const getGrades = async () => {
  const response = await api.get('/academic/grades');
  return response.data;
};

export const getAttendance = async () => {
  const response = await api.get('/academic/attendance');
  return response.data;
};
