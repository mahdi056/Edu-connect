'use client';

import { AuthContext } from '@/app/provider/authprovider';
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi'; 

const Header = () => {
  const {user, SignOut, refreshTrigger} = useContext(AuthContext)
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState({})
  
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://college-server-zeta.vercel.app/users/${user.email}`)
        .then(res => {
          setUserInfo(res.data);
          
        })
        .catch(console.error);
    }
  }, [user?.email, refreshTrigger]);

   const navLinks = (
    <>
      <Link
        href='/'
        className={pathname === '/' ? 'text-black px-2 py-1 rounded-sm bg-info' : ''}
      >
        Home
      </Link>
      <Link
        href='/colleges'
        className={pathname === '/colleges' ? 'text-black px-2 py-1 rounded-sm bg-info' : ''}
      >
        Colleges
      </Link>
      <Link
        href={user ? '/admissionge' : '/login'}
        className={pathname === '/admission' ? 'text-black px-2 py-1 rounded-sm bg-info' : ''}
      >
        Admission
      </Link>
      <Link
        href={user ? '/mycollege' : '/login'}
        className={pathname === '/mycollege' ? 'text-black px-2 py-1 rounded-sm bg-info' : ''}
      >
        My College
      </Link>
    </>
  );

  

  
  
  return (
    <div className='flex justify-between items-center mt-2 mx-4 py-2 relative'>
      <div className='text-xl font-bold text-info'>EDU CONNECT</div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex gap-x-4 items-center'>{navLinks}</div>

      {/* Mobile Toggle Button */}
      <div className='md:hidden'>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-start p-4 gap-2 md:hidden z-50'>
          {navLinks}
          {user && (
            <Link href='/profile'>
              <div className='border-2 border-black rounded-full p-2'>{userInfo.name}</div>
            </Link>
          )}
          <div>
            {user ? (
              <div onClick={SignOut} className='btn btn-sm btn-error mt-2'>
                Logout
              </div>
            ) : (
              <Link href='/login'>
                <div className='btn btn-sm btn-info mt-2'>Login</div>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Right Side (Always visible) */}
      <div className='hidden md:flex items-center gap-x-2'>
        {user && (
          <Link href='/profile'>
            <div className='border-2 border-black rounded-full p-2'>{userInfo.name}</div>
          </Link>
        )}
        <div>
          {user ? (
            <div onClick={SignOut} className='btn btn-sm btn-error'>
              Logout
            </div>
          ) : (
            <Link href='/login'>
              <div className='btn btn-sm btn-info'>Login</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
