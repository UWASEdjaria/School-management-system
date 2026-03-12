'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import Overview from '@/components/dashboard/Overview';
import Fees from '@/components/dashboard/Fees';
import Profile from '@/components/dashboard/Profile';
import Grades from '@/components/dashboard/Grades';
import Notifications from '@/components/dashboard/Notifications';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'fees' && <Fees />}
          {activeTab === 'grades' && <Grades />}
          {activeTab === 'notifications' && <Notifications />}
          {activeTab === 'profile' && <Profile />}
        </main>
      </div>
    </div>
  );
}