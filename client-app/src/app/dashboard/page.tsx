'use client';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import Overview from '@/components/dashboard/Overview';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'fees' && <div>Fees Management</div>}
          {activeTab === 'profile' && <div>Profile Settings</div>}
        </main>
      </div>
    </div>
  );
}