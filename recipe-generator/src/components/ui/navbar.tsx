import React from "react";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-amber-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Recipe Generator</div>
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
            <a href="/about" className="text-white hover:text-gray-300">
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}