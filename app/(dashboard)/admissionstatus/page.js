'use client'
import { AuthContext } from '@/app/provider/authprovider';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

const AdmissionStatus = () => {
  const { user } = useContext(AuthContext)
  const [admissions, setAdmissions] = useState([]);


  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/admissions?userEmail=${user.email}`)
        .then(res => {
          setAdmissions(res.data);

        })
        .catch(console.error);
    }
  }, [user]);

  if (!user) return <p className="p-6">Please login to view your admission status</p>;
  if (admissions.length === 0)
    return <p className='font-bold text-center'>No Admissions Yet.</p>


  return (
    <div>

      <h2 className='font-bold text-center text-info'>Admission Status</h2>


      <div className="mb-8 mt-8">
        {admissions.map(adm => (
          <div
            key={adm._id}
            className='p-4 rounded-xl mb-4 shadow-lg'

          >
            <h2 className="text-xl font-semibold">{adm.collegeName}</h2>
            <p><strong>Subject:</strong> {adm.subject}</p>
            <p><strong>Email:</strong> {adm.candidateEmail}</p>
            <p><strong>Phone:</strong> {adm.phone}</p>
            <p><strong>Address:</strong> {adm.address}</p>
            <p><strong>Date of Birth:</strong> {adm.dob}</p>
            <p>
              <strong>Admission Status:</strong>{" "}
              {adm.status === true
                ? "Congratulations! Your admission has been approved."
                : adm.status === false
                  ? "We regret to inform you that your admission was not successful."
                  : "Your admission application is currently under review. Please wait for further updates."}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdmissionStatus;