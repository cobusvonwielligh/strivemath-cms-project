import React, { useState } from 'react';
import Router from 'next/router';
import Layout from '../app/layout'; // Adjust the import path based on your project structure
import '../app/globals.css';

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Post to your custom Strapi registration endpoint
    const response = await fetch('http://localhost:1337/api/create-author', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Registration successful', data);
      // Redirect to the admin dashboard after successful registration
      Router.push('http://localhost:1337/admin');
    } else {
      console.error('Registration failed', data);
      // Display error message
      setError(data.error.message);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white py-10">
        <h2 className="text-2xl font-semibold mb-4">Register as Content Creator</h2>
        {error && <div className="text-red-500">{error}</div>}
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="firstname">
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="firstname"
                type="text"
                placeholder="First Name"
                name="firstname"
                value={userData.firstname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="lastname">
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="lastname"
                type="text"
                placeholder="Last Name"
                name="lastname"
                value={userData.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPage;