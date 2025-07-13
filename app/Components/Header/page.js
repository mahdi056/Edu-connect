'use client';

import { AuthContext } from '@/app/provider/authprovider';
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

const Header = () => {
  const {user, SignOut, refreshTrigger} = useContext(AuthContext)
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/users/${user.email}`)
        .then(res => {
          setUserInfo(res.data);
          
        })
        .catch(console.error);
    }
  }, [user?.email, refreshTrigger]);

  

  
  
  return (
    <div className='flex justify-between items-center mt-2 mx-4 py-2'>
      <div className='text-xl font-bold text-info'>EDU CONNECT</div>

      <div className='flex gap-x-4 items-center'>
        <Link href='/' className={pathname === '/' ? 'text-black px-2 py-1 rounded-sm bg-info' : ''}>
          Home
        </Link>
        <Link href='/colleges' className={pathname === '/colleges' ? 'text-black px-2 py-1 rounded-sm bg-info' : ''}>
          Colleges
        </Link>
        <Link href='/admission' className={pathname === '/admission' ? 'text-black px-2 py-1 rounded-sm bg-info' : ''}>
          Admission
        </Link>

        {
          user ? ( <Link href='/mycollege' className={pathname === '/mycollege' ? 'text-black px-2 py-1 rounded-sm bg-info' : ''}>
          My College
        </Link>
)
          :
          ( <Link href='/login' className={pathname === '/mycollege' ? 'text-black px-2 py-1 rounded-sm bg-info' : ''}>
          My College
        </Link>
)
        }

       

      </div>

     <div className='flex items-center gap-x-2'>

      {
        user && 
        (

        <Link href='/profile'><div className='border-2 border-black rounded-full p-2'>{userInfo.name}</div></Link>
      
      )
      }

      <div> {
        user ? ( <Link href='/login'><div onClick={SignOut} className='btn btn-sm btn-error'>Logout</div></Link>)
        :
        ( <Link href='/login'><div className='btn btn-sm btn-info'>Login</div></Link>)
      }</div>

     </div>
     
    </div>
  );
};

export default Header;
