// src/app/layout.tsx
import React from 'react';
import Image from 'next/image'; // Import Image component for logo

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <header className="flex items-center justify-start p-5 text-xl text-white bg-gray-800">
        {/* Wrapper div for the logo with a circle background */}
        <div className="flex items-center justify-center bg-gray-500 rounded-full p-1">
          <Image src="/main-logo.png" alt="Logo" width={50} height={50} className="rounded-full" />
        </div>
        <h1 className="ml-3">StriveMath CMS</h1>
      </header>
      <main className="p-5">{children}</main>
    </div>
  );
};

export default Layout;