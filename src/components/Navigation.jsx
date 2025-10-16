import React from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) => {
  const pages = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              setCurrentPage('home');
              setMobileMenuOpen(false);
            }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">JA</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              Jasna AV
            </span>
          </div>

          <nav className="hidden md:flex space-x-8">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`capitalize transition-colors ${
                  currentPage === page ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {page}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden text-cyan-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 capitalize text-gray-300 hover:text-cyan-400 transition-colors"
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;