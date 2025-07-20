import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image } from "lucide-react";
export default function RecipesPage(){

    return (
         <div className="container mx-auto p-4">
        <div className="mb-6">
            <h1 className="text-3xl font-bold mb-4">Search</h1>
            <Input type="text" placeholder="Search cards..." className="w-full max-w-md p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <Image className="w-full h-32 object-cover rounded-md mb-2"/>
                <h3 className="text-lg font-semibold">Card 1</h3>
                <Button className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full">Like</Button>
            </div>
             <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <Image className="w-full h-32 object-cover rounded-md mb-2"/>
                <h3 className="text-lg font-semibold">Card 1</h3>
                <Button className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full">Like</Button>
            </div>
             <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <Image className="w-full h-32 object-cover rounded-md mb-2"/>
                <h3 className="text-lg font-semibold">Card 1</h3>
                <Button className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full">Like</Button>
            </div>
             <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <Image className="w-full h-32 object-cover rounded-md mb-2"/>
                <h3 className="text-lg font-semibold">Card 1</h3>
                <Button className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full">Like</Button>
            </div>
             <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <Image className="w-full h-32 object-cover rounded-md mb-2"/>
                <h3 className="text-lg font-semibold">Card 1</h3>
                <Button className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full">Like</Button>
            </div>
             <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <Image className="w-full h-32 object-cover rounded-md mb-2"/>
                <h3 className="text-lg font-semibold">Card 1</h3>
                <Button className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full">Like</Button>
            </div>
             <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <Image className="w-full h-32 object-cover rounded-md mb-2"/>
                <h3 className="text-lg font-semibold">Card 1</h3>
                <Button className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full">Like</Button>
            </div>
             <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <Image className="w-full h-32 object-cover rounded-md mb-2"/>
                <h3 className="text-lg font-semibold">Card 1</h3>
                <Button className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full">Like</Button>
            </div>
             <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <Image className="w-full h-32 object-cover rounded-md mb-2"/>
                <h3 className="text-lg font-semibold">Card 1</h3>
                <Button className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full">Like</Button>
            </div>
             <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <Image className="w-full h-32 object-cover rounded-md mb-2"/>
                <h3 className="text-lg font-semibold">Card 1</h3>
                <Button className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full">Like</Button>
            </div>
             <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <Image className="w-full h-32 object-cover rounded-md mb-2"/>
                <h3 className="text-lg font-semibold">Card 1</h3>
                <Button className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full">Like</Button>
            </div>
             <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <Image className="w-full h-32 object-cover rounded-md mb-2"/>
                <h3 className="text-lg font-semibold">Card 1</h3>
                <Button className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full">Like</Button>
            </div>
        </div>
    </div>
    );
}