'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ManageAdmission = () => {
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const res = await axios.get('https://college-server-zeta.vercel.app/admin/admissions');
      setAdmissions(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      const result = await MySwal.fire({
        title: `Are you sure to ${status ? 'Accept' : 'Reject'}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: status ? 'Yes, Accept' : 'Yes, Reject',
        cancelButtonText: 'Cancel',
      });

      if (!result.isConfirmed) return;

      await axios.patch(`https://college-server-zeta.vercel.app/admin/admission/${id}`, { status });
      fetchAdmissions();

      MySwal.fire('Updated!', `The application has been ${status ? 'accepted' : 'rejected'}.`, 'success');
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: 'Are you sure to delete?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`https://college-server-zeta.vercel.app/admin/admission/${id}`);
      setAdmissions(prev => prev.filter(ad => ad._id !== id));

      MySwal.fire('Deleted!', 'The admission has been removed.', 'success');
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Admissions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {admissions.map(ad => (
          <div key={ad._id} className=" p-4 rounded shadow-lg bg-white space-y-2">
            <div className="relative w-full h-48">
              <Image
                src={ad.image}
                alt={ad.candidateName}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <p><strong>College:</strong> {ad.collegeName}</p>
            <p><strong>Name:</strong> {ad.candidateName}</p>
            <p><strong>Subject:</strong> {ad.subject}</p>
            <p><strong>Email:</strong> {ad.candidateEmail}</p>
            <p><strong>User Email:</strong> {ad.userEmail}</p>
            <p><strong>Phone:</strong> {ad.phone}</p>
            <p><strong>SSC Result:</strong> {ad.sscResult}</p>
            <p><strong>HSC Result:</strong> {ad.hscResult}</p>
            <p><strong>Address:</strong> {ad.address}</p>
            <p><strong>DOB:</strong> {ad.dob}</p>
            <p>
              <strong>Status:</strong>{' '}
              {ad.status === true ? '✅ Accepted' : ad.status === false ? '❌ Rejected' : '⏳ Pending'}
            </p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleStatus(ad._id, true)}
                className="btn btn-success btn-sm"
              >
                Accept
              </button>
              <button
                onClick={() => handleStatus(ad._id, false)}
                className="btn btn-warning btn-sm"
              >
                Reject
              </button>
              <button
                onClick={() => handleDelete(ad._id)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAdmission;
