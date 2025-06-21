import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TutorNavbar from './TutorNavbar';
import TutorSidebar from './TutorSidebar';

const TutorLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('tutorSidebarCollapsed');
    return saved ? JSON.parse(saved) : true; // Start collapsed by default
  });

  useEffect(() => {
    localStorage.setItem('tutorSidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  return (
    <div className="min-h-screen bg-gray-50">
      <TutorNavbar />
      <div className="flex">
        <TutorSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
        <main className={`flex-1 p-6 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TutorLayout; 