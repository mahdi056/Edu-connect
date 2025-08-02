'use client';

import Link from 'next/link';
import React, { useState, useContext, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import AuthProvider, { AuthContext } from '@/app/provider/authprovider';
import { usePathname } from 'next/navigation';  // <---- Add this import

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext); 
  const [role, setRole] = useState(null); 
  const pathname = usePathname(); // <---- get current route

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/users/${user.email}`)
        .then(res => setRole(res.data.role)) 
        .catch(err => {
          console.error('Failed to fetch user role', err);
          setRole(null);
        });
    }
  }, [user?.email]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Helper to add active class
  const linkClass = (href) => {
    return `block px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium ${
      pathname === href ? 'bg-blue-200 font-bold text-blue-800' : ''
    }`;
  };

  const adminLinks = (
    <>
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Admin Panel</h2>
      <nav className="space-y-4">
        <Link href="/adminprofile" className={linkClass('/adminprofile')}>Admin Profile</Link>
        <Link href="/addcollege" className={linkClass('/addcollege')}>Add College</Link>
        <Link href="/mngcollege" className={linkClass('/mngcollege')}>Manage College</Link>
        <Link href="/mngadmission" className={linkClass('/mngadmission')}>Manage Admission</Link>
        <Link href="/users" className={linkClass('/users')}>Manage Users</Link>
        <Link href="/" className={linkClass('/')}>Home</Link>
      </nav>
    </>
  );

  const userLinks = (
    <>
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Edu Connect</h2>
      <nav className="space-y-4">
        <Link href="/profile" className={linkClass('/profile')}>Profile</Link>
        <Link href="/mycollege" className={linkClass('/mycollege')}>My College</Link>
        <Link href="/admissionstatus" className={linkClass('/admissionstatus')}>Admission Status</Link>
        <Link href="/" className={linkClass('/')}>Home</Link>
      </nav>
    </>
  );

  if (!user) {
    return (
      <div className="p-4">Loading menu...</div>
    );
  }

  return (
    <AuthProvider>
      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 bg-white shadow-md">
        <button onClick={toggleSidebar} className="text-gray-700 text-2xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 bg-white shadow-md p-6 min-h-screen w-64 transition-transform transform md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:block`}
      >
        {/* Close button for mobile */}
        <div className="md:hidden text-right mb-4">
          <button onClick={toggleSidebar} className="text-gray-500 text-xl">
            <FaTimes />
          </button>
        </div>

        {role === 'admin' ? adminLinks : userLinks}
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-10 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </AuthProvider>
  );
};

export default Sidebar;
