import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand Section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl text-center font-bold text-blue-400"> SpaceNetra</h2>
          <p className="text-sm mt-1">AI-powered space knowledge assistant</p>
          <p className="text-xs mt-1">&copy; {new Date().getFullYear()} SpaceNetra. All rights reserved.</p>
        </div>

        {/* Navigation */}
        <div className="text-sm text-center">
          <p className="mb-1 text-blue-400">Navigation</p>
          <ul className="flex gap-4 justify-center md:justify-start">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/blog" className="hover:text-white">Blog</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
          <ul className="flex gap-4 justify-center md:justify-start">
            <li><a href="/Home" className="hover:text-white">SpaceNetraAiBot</a></li>
            <li><a href="/Stats" className="hover:text-white">Stats</a></li>
            <li><a href="/Team" className="hover:text-white">Team</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-right">
          <p className="mb-2 text-center text-sm">Follow Us</p>
          <div className="flex justify-center md:justify-end gap-4 text-lg">
            <a href="https://github.com/Kash04ish" target="_blank" rel="noreferrer">
              <FaGithub className="hover:text-white" />
            </a>
            <a href="https://linkedin.com/in/kashish-verma-307308257" target="_blank" rel="noreferrer">
              <FaLinkedin className="hover:text-white" />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
