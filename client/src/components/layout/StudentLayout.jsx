import React, { useState, useEffect } from 'react';
import StudentNavbar from './StudentNavbar';
import StudentSidebar from './StudentSidebar';
import { Outlet } from 'react-router-dom';

const StudentLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('studentSidebarCollapsed');
    return saved ? JSON.parse(saved) : true; // Start collapsed by default
  });

  useEffect(() => {
    localStorage.setItem('studentSidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavbar />
      <div className="flex">
        <StudentSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
        <main className={`flex-1 p-6 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;