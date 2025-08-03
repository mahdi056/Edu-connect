'use client';

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AddCollege = () => {
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    name: '',
    rating: '',
    admissionDate: '',
    researchCount: '',
    events: '',
    sports: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageData = new FormData();
    imageData.append('image', formData.image);
    const imgbbApiKey = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: imageData,
      });

      const imgResult = await res.json();
      const imageUrl = imgResult.data.display_url;

      const collegeData = {
        name: formData.name,
        image: imageUrl,
        rating: parseFloat(formData.rating),
        admissionDate: formData.admissionDate,
        researchCount: parseInt(formData.researchCount),
        events: formData.events.split(',').map(e => e.trim()),
        sports: formData.sports.split(',').map(s => s.trim()),
      };

      await axios.post('https://college-server-zeta.vercel.app/colleges', collegeData);

      toast.success('College added successfully', {
        position: 'top-center',
        autoClose: 2000,
      });

      // Reset form fields
      setFormData({
        name: '',
        rating: '',
        admissionDate: '',
        researchCount: '',
        events: '',
        sports: '',
        image: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error(error);
      alert('Failed to add college');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Add College</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="College Name" required value={formData.name} onChange={handleChange} className="input input-bordered w-full" />
        <input type="file" name="image" required onChange={handleFileChange} className="file-input w-full" ref={fileInputRef} />
        <input type="text" name="rating" placeholder="Rating (e.g. 4.5)" required value={formData.rating} onChange={handleChange} className="input input-bordered w-full" />
        <input type="date" name="admissionDate" required value={formData.admissionDate} onChange={handleChange} className="input input-bordered w-full" />
        <input type="number" name="researchCount" placeholder="Research Count" required value={formData.researchCount} onChange={handleChange} className="input input-bordered w-full" />
        <input type="text" name="events" placeholder="Events (comma-separated)" required value={formData.events} onChange={handleChange} className="input input-bordered w-full" />
        <input type="text" name="sports" placeholder="Sports (comma-separated)" required value={formData.sports} onChange={handleChange} className="input input-bordered w-full" />
        <button type="submit" className="btn btn-primary w-full">Add College</button>
      </form>
    </div>
  );
};

export default AddCollege;
