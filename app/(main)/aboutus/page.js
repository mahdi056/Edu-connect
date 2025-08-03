'use client';

import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">About Edu Connect</h1>

      <section className="space-y-8 text-gray-700">
        <p className="text-lg">
          Edu Connect is an innovative platform dedicated to simplifying the college admission process. 
          We aim to bridge the gap between aspiring students and top educational institutions by providing 
          a transparent, efficient, and user-friendly admission management system.
        </p>

        <p className="text-lg">
          Whether you are a student looking to apply for your dream college or an admin managing the admission workflow, 
          Edu Connect offers tools tailored to make your journey smooth and stress-free.
        </p>

        <h2 className="text-2xl font-semibold text-blue-500 mt-10">Our Mission</h2>
        <p className="text-lg">
          To empower students with opportunities and streamline college management through digital transformation.
        </p>

        <h2 className="text-2xl font-semibold text-blue-500 mt-10">Why Choose Us?</h2>
        <ul className="list-disc ml-6 text-lg space-y-2">
          <li>Easy-to-use admission forms and tracking system</li>
          <li>Admin panel for managing colleges and users</li>
          <li>Secure, real-time data updates</li>
          <li>Student profile and admission status tracking</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-500 mt-10">Contact Us</h2>
        <p className="text-lg">
          Have questions or suggestions? Reach out to us at: <br />
          <span className="font-medium">support@educonnect.com</span>
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
