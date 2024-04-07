import React from 'react';
import Layout from '../app/layout'; 
import '../app/globals.css';

export default function Home() {
  // Adjust these URLs based on your Strapi deployment
  const strapiRegisterUrl = '/register';
  const strapiLoginUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/admin/auth/login`;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white py-10">
        <h1 className="text-3xl font-semibold mb-8">Welcome</h1>
        <div className="flex flex-col items-center space-y-4 max-w-xs w-full">
          {/* Register Button */}
          <a href={strapiRegisterUrl} target="_blank" rel="noopener noreferrer" 
             className="w-full text-center px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition duration-200 ease-in-out text-lg font-medium">
            Register as Content Creator
          </a>
          {/* Login Button */}
          <a href={strapiLoginUrl} target="_blank" rel="noopener noreferrer" 
             className="w-full text-center px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition duration-200 ease-in-out text-lg font-medium">
            Login to CMS Dashboard
          </a>
        </div>
      </div>
    </Layout>
  );
}