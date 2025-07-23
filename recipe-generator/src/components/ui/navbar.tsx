import React from "react";
import { Shadows_Into_Light } from 'next/font/google';

const shadows = Shadows_Into_Light({
  subsets: ['latin'],
  weight: '400',
});
export const Navbar: React.FC = () => {
  return (
    <nav className="bg-amber-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className={`${shadows.className} text-white text-4xl font-bold` }>DishGenie</div>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="/recipes" className="text-white hover:text-gray-300">
              Recipes
            </a>
          </li>
          <li>
            <a href="/account/signup" className="text-white hover:text-gray-300">
              Sign up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}