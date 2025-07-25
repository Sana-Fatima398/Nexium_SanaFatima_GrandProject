import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Shadows_Into_Light } from 'next/font/google';
import { RecipeProvider } from "./context/RecipeContext";
import { UserProvider } from "./context/UserContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shadows = Shadows_Into_Light({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-shadows',
});

export const metadata: Metadata = {
  title: "Dish Genie",
  description: "Generates a recipe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${shadows.variable} antialiased bg-amber-50 flex flex-col min-h-screen`}
      >
        <UserProvider>
          <RecipeProvider>
            <Navbar />
            
            <main className="flex-grow">
            {children}
            </main>
          
            <footer className="bg-amber-600 text-white py-4 mt-8 bottom-0">
            <div className="container mx-auto text-center">
              <p>&copy; {new Date().getFullYear()} Recipe Generator. All rights reserved.</p>    
              </div>  
          </footer> 
        </RecipeProvider>
      </UserProvider>
      </body>
    </html>
  );
}
