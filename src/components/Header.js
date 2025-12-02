// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wider bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          JJIGIT
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/create"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            새 투표 만들기
          </Link>
          <Link
            to="/login"
            className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
