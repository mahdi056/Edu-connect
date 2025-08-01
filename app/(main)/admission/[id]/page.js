'use client'

import { useContext, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { AuthContext } from '@/app/provider/authprovider';

const AdmissionForm = () => {
  const { user } = useContext(AuthContext);
  const { collegeId } = useParams();
  const [success, setSuccess] = useState(false);
   const searchParams = useSearchParams();
    const collegeName = searchParams.get('name');
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      collegeId,
      collegeName,
      candidateName: form.candidateName.value,
      subject: form.subject.value,
      candidateEmail: form.candidateEmail.value,
      phone: form.phone.value,
      address: form.address.value,
      dob: form.dob.value,
      image: form.image.value,
      userEmail: user?.email,
    };

    try {
      const res = await axios.post('https://college-server-zeta.vercel.app/admission', data);
      if (res.data.insertedId) {
        setSuccess(true);
        form.reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Admission Form</h2>
      {success && <p className="text-green-600 mb-4">Admission submitted successfully!</p>}

      <form onSubmit={handleSubmit}>
        <input name="candidateName" type="text" placeholder="Candidate Name" className="input input-bordered w-full mb-3" required />
        <input name="subject" type="text" placeholder="Subject" className="input input-bordered w-full mb-3" required />
        <input name="candidateEmail" type="email" placeholder="Candidate Email" className="input input-bordered w-full mb-3" required />
        <input name="phone" type="text" placeholder="Phone Number" className="input input-bordered w-full mb-3" required />
        <input name="address" type="text" placeholder="Address" className="input input-bordered w-full mb-3" required />
        <input name="dob" type="date" className="input input-bordered w-full mb-3" required />
        <input name="image" type="text" placeholder="Image URL" className="input input-bordered w-full mb-3" required />

        <button type="submit" className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
  );
};

export default AdmissionForm;
