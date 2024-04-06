// src/app/layout.tsx
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      {/* Your layout structure */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;