import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Layout from '../app/layout';
import '../app/globals.css';

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    organizationId: '',
  });
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [newOrganization, setNewOrganization] = useState('');
  const [isNewOrganizationSelected, setIsNewOrganizationSelected] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/organizations`);
        const data = await response.json();
        setOrganizations(data.data || []);
      } catch (error) {
        console.error('Error fetching organizations', error);
        setError('Failed to fetch organizations');
      }
    };

    fetchOrganizations();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleOrganizationChange = (e: any) => {
    const { value } = e.target;
    setUserData({ ...userData, organizationId: value });
    setIsNewOrganizationSelected(value === 'create-new');
  };

  const handleNewOrganizationChange = (e: any) => {
    setNewOrganization(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isNewOrganizationSelected && !newOrganization) {
      setError('Please enter a name for the new organization.');
      return;
    }

    setError('');
    setIsRegistering(true);

    try {
      let organizationId = userData.organizationId;
      if (isNewOrganizationSelected && newOrganization) {
        const organizationResponse = await createNewOrganization();
        if (!organizationResponse.ok) {
          const errorData = await organizationResponse.json();
          const errorMessage = errorData.error.message || 'Unknown error creating organization.';
          throw new Error(`Failed to create organization: ${errorMessage}`);
        }
        const organizationData = await organizationResponse.json();
        organizationId = organizationData.data.id;
      }

      const registrationResponse = await registerUser(organizationId);
      if (!registrationResponse.ok) {
        const errorData = await registrationResponse.json();
        const errorMessage = errorData.error ? errorData.error.message : 'An unknown error occurred during registration.';
        throw new Error(errorMessage);
      }
      const registrationData = await registrationResponse.json();
      console.log('Registration successful', registrationData);
      Router.push(`${process.env.NEXT_PUBLIC_HOST_URL}/admin/auth/login`);
    } catch (error: any) {
      setError(error.message);
      console.error('Registration error:', error.message);
    } finally {
      setIsRegistering(false);
    }
  };

  const createNewOrganization = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/organizations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { name: newOrganization } }),
    });
  };

  const registerUser = async (organizationId: any) => {
    const userPayload = { ...userData, organizationId };
    return fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/create-author`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userPayload),
    });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white py-10">
        <h2 className="text-2xl font-semibold mb-4">Register as Content Creator</h2>
        {isRegistering && <div className="text-blue-500">Registering...</div>}
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

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="organizationId">
                Organization
              </label>
              <select
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="organizationId"
                name="organizationId"
                value={userData.organizationId}
                onChange={handleOrganizationChange}
                required
              >
                <option value="" disabled>Select organization</option>
                {organizations.map((org: any) => (
                  <option key={org.id} value={org.id}>{org.attributes.name}</option>
                ))}
                <option value="create-new">➕ Register New</option>
              </select>
            </div>
          </div>

          {isNewOrganizationSelected && (
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="newOrganization">
                  New Organization
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="newOrganization"
                  type="text"
                  placeholder="Organization Name"
                  value={newOrganization}
                  onChange={handleNewOrganizationChange}
                  required={isNewOrganizationSelected}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isRegistering}
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