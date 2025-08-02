'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Image from 'next/image';

const MySwal = withReactContent(Swal);

const ManageCollege = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const res = await axios.get('http://localhost:5000/all-college');
      setColleges(res.data);
    } catch (err) {
      console.error('Error fetching colleges:', err);
    }
  };

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'This college will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/colleges/${id}`);
        setColleges(prev => prev.filter(college => college._id !== id));
        MySwal.fire('Deleted!', 'The college has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting college:', error);
        MySwal.fire('Error!', 'Failed to delete the college.', 'error');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Manage Colleges</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {colleges.map(college => (
          <div key={college._id} className="border p-4 rounded shadow">
            <div className="w-full h-48 relative mb-4">
              <Image
                src={college.image}
                alt={college.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h3 className="text-xl font-semibold">{college.name}</h3>
            <p><strong>Rating:</strong> {college.rating}</p>
            <p><strong>Admission Date:</strong> {college.admissionDate}</p>
            <p><strong>Research Count:</strong> {college.researchCount}</p>
            <p><strong>Events:</strong> {college.events?.join(', ')}</p>
            <p><strong>Sports:</strong> {college.sports?.join(', ')}</p>
            <button
              onClick={() => handleDelete(college._id)}
              className="mt-4 btn btn-error text-white w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCollege;
