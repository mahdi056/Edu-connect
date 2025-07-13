'use client';

import React, { useContext, useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '../provider/authprovider';

const Login = () => {

  const {userLogin, setUser} = useContext(AuthContext);
  const router = useRouter();
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value

     userLogin(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                e.target.reset();
                router.push('/');
            })
            .catch((error) => {
                console.error(error.message)
            });

    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

       

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input 
            type="email"
            name="email"
            
            
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input 
            type="password"
            name="password"
           
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

      

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

         <p className='mt-4 text-center'>Create an account<Link href='/register'><button className='btn btn-outline btn-info ml-2'>Register</button></Link></p>

      </form>
    </div>
  );
};

export default Login;
