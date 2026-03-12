import api, { getDeviceId } from '../utils/api';
import Cookies from 'js-cookie';

export const login = async (username: string, password: string) => {
  const deviceId = getDeviceId();
  const deviceName = 'Student/Parent Web Dashboard';

  const response = await api.post('/index.php/login', {
    username,
    password,
    deviceId,
    deviceName
  });

  if (response.data.token) {
    Cookies.set('token', response.data.token, { expires: 1 });
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }

  return response.data;
};

export const register = async (userData: any) => {
  const deviceId = getDeviceId();
  const deviceName = 'Student/Parent Web Dashboard';

  const response = await api.post('/index.php/register', {
    ...userData,
    deviceId,
    deviceName
  });

  return response.data;
};

export const logout = () => {
  Cookies.remove('token');
  localStorage.removeItem('user');
  window.location.href = 'http://localhost/school-management-system/';
};
