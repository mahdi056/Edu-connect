'use client'


import PrivateRoute from '@/app/(main)/Components/Privateroute';
import { AuthContext } from '@/app/provider/authprovider';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { toast, ToastContainer } from 'react-toastify';


const Profile = () => {
  const { user, refreshTrigger, setRefreshTrigger } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    
    location: ''
  });


  useEffect(() => {
    if (user?.email) {
      axios.get(`https://college-server-zeta.vercel.app/users/${user.email}`)
        .then(res => {
          setUserInfo(res.data);
          setFormData({
            name: res.data.name || '',
          
            location: res.data.location || ''
          });
        })
        .catch(console.error);
    }
  }, [user]);

  

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleUpdate = (e) => {
    e.preventDefault();

    axios.put(`https://college-server-zeta.vercel.app/users/${user.email}`, formData)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          toast.success("Profile updated successfully!", {
            position: 'top-center',
            autoClose: 2000
          });
           setRefreshTrigger(prev => !prev);
          setUserInfo(formData);
         
          setEditMode(false);
        }
      })
      .catch(console.error);
  };

  return (
   <PrivateRoute>
    
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <ToastContainer></ToastContainer>
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

      {editMode ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block font-semibold">Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
        
          <div>
            <label className="block font-semibold">Location:</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      ) : (
        <div className="space-y-3">
          <p><strong>Name:</strong> {userInfo.name}</p>
          
          <p><strong>Location:</strong> {userInfo.location || 'N/A'}</p>
          <button onClick={() => setEditMode(true)} className="bg-green-600 text-white px-4 py-2 rounded">Edit</button>
        </div>
      )}
    </div>

   </PrivateRoute>

  );
};

export default Profile;
