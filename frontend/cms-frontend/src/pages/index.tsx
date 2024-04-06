import React from 'react';
import Layout from '../app/layout'; // Assuming this layout has the desired styling and logo
import '../app/globals.css';

export default function Home() {
  // Assuming Strapi is running on http://localhost:1337
  // Adjust these URLs based on your Strapi deployment
  const strapiRegisterUrl = '/register';
  const strapiLoginUrl = 'http://localhost:1337/admin/auth/login';

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white py-10">
        <h1 className="text-4xl font-bold mb-8"></h1>
        {/* Register Button */}
        <a href={strapiRegisterUrl} target="_blank" rel="noopener noreferrer" className="mb-4 px-6 py-3 bg-blue-500 rounded hover:bg-blue-600 transition duration-200 ease-in-out text-xl">
          Register as Content Creator
        </a>
        {/* Login Button */}
        <a href={strapiLoginUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-green-500 rounded hover:bg-green-600 transition duration-200 ease-in-out text-xl">
          Login to Admin Dashboard
        </a>
      </div>
    </Layout>
  );
}