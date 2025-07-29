'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-transparent">
      <nav className="p-4 backdrop-blur-md bg-amber-600 text-white">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="font-shadow text-4xl font-bold tracking-wider">
            DishGenie
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 items-center">
           
            <li>
              <Link href="/" className=" hover:text-gray-300 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/viewRecipe" className=" hover:text-gray-300 transition-colors">
                Recipes
              </Link>
            </li>
            <li>
              <Link href="/events" className=" hover:text-gray-300 transition-colors">
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/account/signup"
                className="text-white bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </li>
          </ul>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="md:hidden flex flex-col items-center space-y-4 mt-4 backdrop-blur-md p-4 ">
            <li>
              <span className="text-white text-lg">Hello, Guest!</span>
            </li>
            <li>
              <Link href="/" className="text-white hover:text-gray-300 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/viewRecipe" className="text-white hover:text-gray-300 transition-colors">
                Recipes
              </Link>
            </li>
            <li>
              <Link href="/events" className="text-white hover:text-gray-300 transition-colors">
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/account/signup"
                className="text-white bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-full transition-colors"
              >
                Get Started
              </Link>
            </li>
          </ul>
        )}
      </nav>

      {/* Decorative Half Circles */}
      <div className="flex flex-row w-full justify-center overflow-hidden">
        {Array.from({ length: 20 }).map((_, idx) => (
          <div
            key={idx}
            className="w-16 h-6 bg-amber-600 backdrop-blur-md rounded-b-full shadow-md shadow-amber-500/20"
          />
        ))}
      </div>
    </div>
  );
};