import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-r bg-black text-white py-8">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">

        {/* Logo and Description */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold">Blog World</h2>
          <p className="text-gray-200 mt-2">Discover stories, insights, and experiences from around the world.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm font-medium text-gray-200 mt-4 md:mt-0">
          <Link to="/" className="hover:text-white transition duration-300">Home</Link>
          <Link to="/about" className="hover:text-white transition duration-300">About</Link>
          <Link to="/blog" className="hover:text-white transition duration-300">Blog</Link>
          <Link to="/contact" className="hover:text-white transition duration-300">Contact</Link>
        </div>


      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-500 mt-8 pt-4 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Blog World. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
