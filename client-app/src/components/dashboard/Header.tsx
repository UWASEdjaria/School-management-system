'use client';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  const handleNotifications = () => {
    router.push('/notifications');
  };

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Student Portal</h1>
          <p className="text-sm text-gray-600">Welcome back, John Doe</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleNotifications}
            className="relative bg-blue-100 text-blue-600 px-3 py-2 rounded hover:bg-blue-200"
          >
            🔔 Notifications
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <span className="text-red-600">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}