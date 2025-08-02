'use client';

import { useContext, useEffect, useState } from 'react';

import axios from 'axios';


import { AuthContext } from '@/app/provider/authprovider';
import PrivateRoute from '../../(main)/Components/Privateroute';

export default function MyCollege() {
  const { user } = useContext(AuthContext);
  const [admissions, setAdmissions] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

 

  
  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/admissions?userEmail=${user.email}`)
        .then(res => {
          setAdmissions(res.data);
          if (res.data.length > 0) setSelectedCollege(res.data[0]);
        })
        .catch(console.error);
    }
  }, [user]);



  const submitReview = async (e) => {
    e.preventDefault();
    if (!selectedCollege) return;

    try {
      const res = await axios.post('http://localhost:5000/review', {
        userEmail: user.email,
        collegeName: selectedCollege.collegeName,
        rating,
        feedback
      });
      if (res.data.success) {
        setMessage('Review submitted successfully!');
        setFeedback('');
        setRating(5);
      }
    } catch {
      setMessage('Failed to submit review');
    }
  };

  if (!user) return <p className="p-6">Please login to view your colleges and add reviews.</p>;

  if (admissions.length === 0) return <p className="p-6">No admissions found.</p>;

  return (
    <PrivateRoute>
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My College Details</h1>

      {/* Admissions List */}
      <div className="mb-8">
        {admissions.map(adm => (
          <div
            key={adm._id}
            className={`p-4 border rounded mb-4 cursor-pointer ${selectedCollege?._id === adm._id ? 'bg-blue-50' : ''}`}
            onClick={() => setSelectedCollege(adm)}
          >
            <h2 className="text-xl font-semibold">{adm.collegeName}</h2>
            <p><strong>Subject:</strong> {adm.subject}</p>
            <p><strong>Email:</strong> {adm.candidateEmail}</p>
            <p><strong>Phone:</strong> {adm.phone}</p>
            <p><strong>Address:</strong> {adm.address}</p>
            <p><strong>Date of Birth:</strong> {adm.dob}</p>
          </div>
        ))}
      </div>

      {/* Review Form */}
      {selectedCollege && (
        <div>
          <h2 className="text-2xl font-semibold mb-3">Add a Review for {selectedCollege.collegeName}</h2>
          {message && <p className="mb-4 text-green-600">{message}</p>}

          <form onSubmit={submitReview} className="space-y-4 max-w-xl">
            <label className="block">
              Rating:
              <select
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
                className="border p-1 rounded ml-2"
              >
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
              </select>
            </label>

            <label className="block">
              Feedback:
              <textarea
                className="w-full p-2 border rounded mt-1"
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="Write your feedback here..."
                required
              />
            </label>

            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        </div>
      )}
    </div>
    </PrivateRoute>
  );
}


