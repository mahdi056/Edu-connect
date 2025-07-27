'use client'
import { FaStar } from "react-icons/fa6";

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from "next/link";
import PrivateRoute from "../Components/privateroute/page";

const Colleges = () => {
    const [colleges, setColleges] = useState([]);

    useEffect(() => {
        axios.get('https://college-server-zeta.vercel.app/all-college')
            .then(res => setColleges(res.data))
            .catch(err => console.error('Error fetching colleges:', err));
    }, []);

    return (
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {colleges.map((college, index) => (
                <div
                    key={index}
                    className="border rounded-lg shadow-md p-4 hover:shadow-xl transition"
                >
                    <div className="w-full h-48 relative mb-4 rounded overflow-hidden">
                        <Image
                            src={college.image}
                            alt={college.name}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{college.name}</h2>
                    <p className="flex gap-x-1"><span className="font-medium flex items-center gap-x-2">Rating: <span><FaStar></FaStar></span></span>  {college.rating}</p>
                    <p><span className="font-medium">Admission Date:</span> {college.admissionDate}</p>
                    <p><span className="font-medium">Research Papers:</span> {college.researchCount}</p>

                    <Link href={`/colleges/${college._id}`}>
                        <button className="mt-4 btn btn-sm btn-info">Details</button>
                    </Link>
                </div>
            ))}
        </div>
       
    );
};

export default Colleges;
