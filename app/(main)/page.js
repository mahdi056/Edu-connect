'use client'

import { useEffect, useState } from 'react';
import banner from '../../public/images/banner.jpg';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from "react-icons/fa6";
import g1 from '../../public/images/g-1.jpg'
import g2 from '../../public/images/g-2.jpg'
import g3 from '../../public/images/g-3.jpg'
import g5 from '../../public/images/g-5.jpg'
import g6 from '../../public/images/g-6.jpg'
import g4 from '../../public/images/g-4.jpg'
import { IoSearchSharp } from "react-icons/io5";

export default function Home() {

  const [colleges, setColleges] = useState([]);
  const galleryImages = [g1, g2, g3, g4, g5, g6];
   const [reviews, setReviews] = useState([]);
   const [searchText, setSearchText] = useState('');
  const [scolleges, setsColleges] = useState([]);

    const handleSearch = async () => {
    try {
      const res = await axios.get(`https://college-server-zeta.vercel.app/all-searched-college?name=${searchText}`);
      setsColleges(res.data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };
  

  useEffect(() => {
    axios.get('https://college-server-zeta.vercel.app/all-college')
      .then(res => {
        const firstThree = res.data.slice(0, 3);
        setColleges(firstThree)
      })
      .catch(err => console.error('Error fetching colleges:', err));
  }, []);

  useEffect(() => {
    axios.get('https://college-server-zeta.vercel.app/reviews')
      .then(res => setReviews(res.data))
      .catch(err => console.error('Failed to fetch reviews:', err));
  }, []);


  return (
    <div>
      {/* banner */}
      <div
        className="h-[80vh] bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-4"
        style={{
          backgroundImage: `url(${banner.src})`,
        }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to College Booking</h1>
        <p className="text-lg md:text-xl mb-6">Search and book top colleges and facilities in one click!</p>

        <div className="w-full max-w-md flex items-center gap-x-2">
          <input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Search for a college..."
            className="w-full p-3 rounded border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <div><button onClick={handleSearch} className='btn btn-info'>Search</button></div>
    
        </div>
        
      </div>

      {/* college card */}

       <div className='mt-12'>
        
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {scolleges.map((college, index) => (
          <div key={index} className="p-4 shadow-lg rounded">
            <Image
              src={college.image}
              alt={college.name}
              width={400}
              height={250}
              className="rounded mb-3"
            />
            <h3 className="text-lg font-semibold">{college.name}</h3>
            <p>Rating: {college.rating}</p>
            <p>Admission Date: {college.admissionDate}</p>
            <p>Research Count: {college.researchCount}</p>
            <p>Events: {college.events?.join(', ')}</p>
            <p>Sports: {college.sports?.join(', ')}</p>
          </div>
        ))}
      </div>
       </div>
    

      {/* 3 cards */}

     <div className='mt-12'>
      <h2 className='text-2xl text-center font-bold'>Top Colleges</h2>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {colleges.map((college, index) => (
          <div key={index} className="rounded-lg shadow-lg p-4">
            <div className="relative w-full h-48 mb-4">
              <Image
                src={college.image}
                alt={college.name}
                layout="fill"
                objectFit="contain"
                className="rounded"
              />
            </div>
            <h2 className="text-xl font-semibold">{college.name}</h2>
            <p className="flex gap-x-1"><span className="font-medium flex items-center gap-x-2">Rating: <span><FaStar></FaStar></span></span>  {college.rating}</p>
            <p> Admission: {college.admissionDate}</p>
            <p>Research Papers: {college.researchCount}</p>

            <Link href={`/colleges/${college._id}`}>
              <button className="mt-4 btn btn-sm btn-info">Details</button>
            </Link>
          </div>
        ))}
      </div>
     </div>
      {/* image section */}

      <div className="p-6 mt-4">



        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-center"> Graduate Group Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <div key={index} className="w-full h-64 relative rounded overflow-hidden shadow">
                <Image
                  src={img}
                  alt={`Graduate group ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </section>
      </div>


      {/* research paper section */}

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Research Papers by Students</h2>
        <ul className="space-y-3 max-w-2xl mx-auto text-blue-600">
          <li>
            <a
              href="https://www.researchgate.net/publication/389851362_Students%27_Perceptions_Toward_AI_in_Language_Education_A_Quantitative_Study_in_Bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Artificial Intelligence in Language Education - by SEC CS Dept.
            </a>
          </li>

          <li>
            <a
              href="https://doi.org/10.1371/journal.pone.0315321"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Prevalence of Overweight and Obesity and Their Impact on Academic Performance - Bangladesh (2024)
            </a>
          </li>

          <li>
            <a
              href="https://www.researchgate.net/publication/391801520_Eye_injuries_in_Bangladesh%27s_2024_student-led_mass_uprising_A_public_health_crisis_unfolds"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Eye Injuries in Bangladesh’s 2024 Student Uprising - A Public Health Crisis (2025)
            </a>
          </li>
        </ul>
      </section>

      {/* reviews section */}

        <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">What Students Say</h2>

        {reviews.length === 0 && (
          <p className="text-center text-gray-500">No reviews yet.</p>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((review, index) => (
            <div key={index} className="border p-4 rounded shadow bg-white hover:shadow-md transition">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{review.collegeName}</h3>
                <span className="text-yellow-500 text-sm">
                  {'⭐'.repeat(review.rating)} ({review.rating}/5)
                </span>
              </div>
              <p className="text-gray-700">{review.feedback}</p>
              {review.userEmail && (
                <p className="mt-2 text-sm text-gray-400">By: {review.userEmail}</p>
              )}
            </div>
          ))}
        </div>
      </section>










    </div>
  );
}
