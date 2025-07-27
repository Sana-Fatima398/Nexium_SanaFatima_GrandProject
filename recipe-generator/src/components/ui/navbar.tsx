import React from "react";
import { Shadows_Into_Light } from 'next/font/google';
import Link from 'next/link';

const shadows = Shadows_Into_Light({
  subsets: ['latin'],
  weight: '400',
});
export const Navbar: React.FC = () => {
  return (
    <div className=" bg-amber-600">
    <nav className=" p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className={`${shadows.className} text-white text-4xl font-bold` }>DishGenie</div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:text-gray-300">Home</Link>
          
          </li>
          <li>
            <Link href="/viewRecipe" className="text-white hover:text-gray-300">Recipes</Link>
          </li>
          <li>
            <Link href="/events" className="text-white hover:text-gray-300">Events</Link>
          </li>
          <li>
            <a href="/account/signup" className="text-white hover:text-gray-300">
              Sign up
            </a>
          </li>
        </ul>
      </div>
  

    </nav>
        <div className="flex flex-row w-full justify-center bg-amber-50 overflow-hidden">
  {/* Half circles */}
  {Array.from({ length: 20 }).map((_, idx) => (
    <div
      key={idx}
      className="w-16 h-6 bg-amber-600 rounded-b-full"
    />
  ))}
</div>
    </div>

  );
}
