'use client'

import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import Link from 'next/link';
import axios from 'axios';
import { AuthContext } from '@/app/provider/authprovider';


const Register = () => {

  const { createUser, setUser, updateUserProfile, SignInwithGoogle } = useContext(AuthContext)
  const [passworderror, setPassworderror] = useState("");
  const router = useRouter();

   const handleGoogleSignIn = () => {
        SignInwithGoogle()
        .then(async (result) => {
            const user = result.user;
            setUser(user);
    
     
            const userInfo = {
                name: user.displayName,
                email: user.email,
                image: user.photoURL    
            };
    
            try {
                const res = await axios.post('https://college-server-zeta.vercel.app/users', userInfo);
                if (res.data.insertedId) {
                    
                    router.push('/');
                } 
                else if (res.data.message === "User already exists") {
                    
                    router.push('/')
                }
            } catch (error) {
                console.error(error);
                toast.error("Google Sign-In failed to save user.", { position: "top-center" });
            }
        })
        .catch((error) => {
            console.error(error);
            toast.error("Google Sign-In failed.", { position: "top-center" });
        });
    }

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const location = e.target.location.value;


    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;

    if (!passwordRegex.test(password)) {
      setPassworderror("Password must include at least one uppercase letter, a special character, and be at least 6 characters long.");
      toast.error("Invalid Password Format", { position: 'top-center' });
      return;
    }



    setPassworderror("");

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateUserProfile({
        displayName: name,
        location: location
      });

      setUser({ ...user, displayName: name, location: location });


      const userInfo = { name, email, location }

      const res = await axios.post('https://college-server-zeta.vercel.app/users', userInfo)

      if (res.data.insertedId) {
        
        e.target.reset();
        router.push('/')
      }
      else if (res.data.message === "User already exists") {
        toast.error("User already exists. Please Login", { position: "top-center" });
      }
    }
    catch (error) {
      console.error(error);
      toast.error("Registration failed!", { position: "top-center" });
    }







  }

  return (
    <div>

      <div>
        <ToastContainer></ToastContainer>

        <div className="flex justify-center items-center h-screen bg-gray-100">
          <form autoComplete='off'
            onSubmit={handleRegister}
            className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"


                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>


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

            <div className="mb-4">
              <label className="block mb-1 font-medium">Location</label>
              <input
                type="text"
                name="location"


                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>



            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Register
            </button>

            <div className='divider'></div>

              <div> <button onClick={handleGoogleSignIn} className='btn btn-outline w-full'>Google Sign In</button></div>

            <p className='mt-4 text-center'>Already have an account? <Link href='/login'><button className='btn btn-outline btn-info'>Login</button></Link></p>
          </form>
        </div>



      </div>

    </div>
  );
};

export default Register;