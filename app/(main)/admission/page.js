'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '@/app/provider/authprovider';
import PrivateRoute from '../Components/Privateroute';


const Admission = () => {
  const [colleges, setColleges] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    axios.get('https://college-server-zeta.vercel.app/all-college')
      .then(res => setColleges(res.data))
      .catch(console.error);
  }, []);

  return (
    <PrivateRoute>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Choose a College for Admission</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {colleges.map(college => {
          const linkHref = user ? `/admission/${college._id}` : '/login';

          return (
            <Link
              key={college._id}
              href={{
                pathname: `/admission/${college._id}`,
                query: { name: college.name },
              }}
            >
              <div className="border rounded p-4 shadow hover:bg-blue-50 cursor-pointer transition">
                <h3 className="font-semibold text-lg">{college.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
    </PrivateRoute>
  );
};

export default Admission;
