
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
