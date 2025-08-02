'use client'


import PrivateRoute from '@/app/(main)/Components/Privateroute';
import { AuthContext } from '@/app/provider/authprovider';

import { useContext } from 'react';




const Profile = () => {
  const { user } = useContext(AuthContext);










  return (
  
    <>
      <h2 className='font-bold text-center text-2xl'>Admin Profile</h2>
            <div className='shadow-2xl mt-8 p-4'>
                
             <p className='text-center mt-4'>Name: {user?.displayName}</p>
            <p className='text-center mt-4'>Email: {user?.email}</p> 
            

          


      </div>

   </>

  );
};

export default Profile;
