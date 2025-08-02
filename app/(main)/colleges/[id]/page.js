'use client'

import axios from 'axios';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaStar } from "react-icons/fa6";
import { AuthContext } from '@/app/provider/authprovider';

const CollegeDetailsPage = () => {
  const { id } = useParams();  
  const [college, setCollege] = useState(null);
  const {loading} = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/college/${id}`)
        .then(res => setCollege(res.data))
        .catch(err => console.error('Error fetching college:', err));
    }
  }, [id]);

  if (!college) return <p>Loading...</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{college.name}</h1>

      <div className="relative w-full h-64 mb-6 rounded overflow-hidden">
        <Image
          src={college.image}
          alt={college.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <p className="flex gap-x-1"><span className="font-medium flex items-center gap-x-2">Rating: <span><FaStar></FaStar></span></span>  {college.rating}</p>
      <p><strong>Admission Date:</strong> {college.admissionDate}</p>
      <p><strong>Research Papers:</strong> {college.researchCount}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Events:</h2>
        <ul className="list-disc list-inside">
          {college.events.map((event, i) => (
            <li key={i}>{event}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Sports Facilities:</h2>
        <ul className="list-disc list-inside">
          {college.sports.map((sport, i) => (
            <li key={i}>{sport}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollegeDetailsPage;
