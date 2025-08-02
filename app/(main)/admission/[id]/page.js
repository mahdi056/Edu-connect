'use client'

import { useContext, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { AuthContext } from '@/app/provider/authprovider';

const AdmissionForm = () => {
  const { user } = useContext(AuthContext);
  const { collegeId } = useParams();
  const searchParams = useSearchParams();
  const collegeName = searchParams.get('name');

  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const imgbbApiKey = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    let imageUrl = '';

    try {
      if (imageFile) {
        setUploading(true);
        const imageData = new FormData();
        imageData.append('image', imageFile);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          imageData
        );

        imageUrl = res.data?.data?.url;
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      return;
    } finally {
      setUploading(false);
    }

    const data = {
      collegeId,
      collegeName,
      candidateName: form.candidateName.value,
      subject: form.subject.value,
      candidateEmail: form.candidateEmail.value,
      phone: form.phone.value,
      sscResult: form.sscresult.value,
      hscResult: form.hscresult.value,
      address: form.address.value,
      dob: form.dob.value,
      image: imageUrl,
      userEmail: user?.email,
    };

    try {
      const res = await axios.post('http://localhost:5000/admission', data);
      if (res.data.insertedId) {
        setSuccess(true);
        form.reset();
        setImageFile(null);
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
        <input name="subject" type="text" placeholder="Choose Subject" className="input input-bordered w-full mb-3" required />
        <input name="candidateEmail" type="email" placeholder="Candidate Email" className="input input-bordered w-full mb-3" required />
        <input name="phone" type="text" placeholder="Phone Number" className="input input-bordered w-full mb-3" required />
        <input name="sscresult" type="text" placeholder="SSC Result" className="input input-bordered w-full mb-3" required />
        <input name="hscresult" type="text" placeholder="HSC Result" className="input input-bordered w-full mb-3" required />
        <input name="address" type="text" placeholder="Address" className="input input-bordered w-full mb-3" required />
        <input name="dob" type="date" className="input input-bordered w-full mb-3" required />
        <input name="image" type="file" accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full mb-3" required />

        <button type="submit" className="btn btn-primary w-full" disabled={uploading}>
          {uploading ? 'Uploading Image...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AdmissionForm;
