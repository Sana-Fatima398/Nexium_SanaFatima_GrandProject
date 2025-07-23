
"use client";
import { CarouselPlugin } from "@/components/ui/carouselPlugin";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shadows_Into_Light } from 'next/font/google';
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const shadows = Shadows_Into_Light({
  subsets: ['latin'],
  weight: '400',
});

export default function Home() {
  
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent)=>{

    e.preventDefault();
    setLoading(true);
    try{
      const response = await axios.post("http://localhost:5678/webhook/8585b14b-bd38-49c8-bb1c-9d88fc6912c5",{"query":prompt});
      console.log('Workflow triggered:', response.data);
      setResult(response.data);
    } catch (error) {
      console.error('Error triggering workflow:', error);
    }
    setLoading(false);
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-rows mx-auto p-12 gap-14">
       
        <div className="ms-10">
          <CarouselPlugin />
          </div>
          <div className="mt-3">
            <h1 className="font-shadow text-7xl text-center text-amber-800 my-6">Dish Genie</h1>
            <h1 className="font-shadow text-7xl text-center">Generate a recipe using AI</h1>
     
          </div>
      </div>

      <h1 className="font-shadow text-5xl text-center mt-10">Write your prompt</h1>
      <div className=" flex flex-col items-center justify-center bg-amber-100 m-14 p-8 rounded-lg">

        <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-6 w-full">
            <Input className=" bg-white w-1/2" 
            value={prompt} 
            onChange={(e)=>setPrompt(e.target.value)}/>
            <Button className=" bg-green-500 w-3/12" type="submit">Generate</Button>
        </div>
        </form>

        
       {loading && (
        <div className="progress-bar w-[60%] mt-5"></div>
        )}
        {result &&(
          <div className="m-5 bg-white p-5">
            {result}
          </div>
        )}
        

      </div>

      <div className="flex flex-col items-center justify-center p-12 bg-amber-100">
        <h1 className="font-shadow text-5xl mb-4">Popular Recipes</h1>
        <p className="text-gray-600 mb-8">Explore our collection of popular recipes.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-48">         
          <Card className="h-96 w-72">
          <CardHeader>
          <CardTitle><img src="/food-pizza-wallpaper-preview.jpg"/></CardTitle>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
      </Card >
        <Card className="h-96 w-72">
          <CardHeader>
       <CardTitle><img src="/food-pizza-wallpaper-preview.jpg"/></CardTitle>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
      </Card>
        <Card className="h-96 w-72">
          <CardHeader>
            <CardTitle><img src="/food-pizza-wallpaper-preview.jpg"/></CardTitle>
           
            <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>

     <div className="flex flex-col gap-16 items-center justify-center p-10">

  {/* Section 1: Personalized Heading + Image */}
  <div className="flex flex-col md:flex-row items-center justify-center gap-0 w-full max-w-5xl my-10">
    <div className="m-10">
          <h1 className="font-shadow text-5xl md:text-6xl text-amber-800 font-semibold text-center md:text-left m-5">
      Personalise it
    </h1>
    <p className="font-shadow text-3xl m-5">Personalize it by adding your own events — whether it's a wedding, Eid, Christmas, or anything special!</p>

    </div>
    <div className="w-3/4 md:w-2/5">
      <img
        src="/cale.png"
        alt="Caleb Image"
        className="w-full rounded-xl shadow-xl hover:scale-105 transition duration-500"
      />
    </div>
  </div>

  {/* Section 2: CTA + Emojis */}
  <div className="flex flex-row md:flex-row items-center justify-center gap-8 w-full max-w-4xl my-10">
    <div>
    <p className="font-shadow text-5xl md:text-6xl text-center md:text-left font-semibold text-amber-800  my-2">
      Do like and subscribe
    </p>
    <p className="font-shadow text-3xl my-5">Personalize it by adding your own events — whether it's a wedding, Eid, Christmas, or anything special!</p>
</div>
    <div className="bg-amber-400 text-white text-4xl md:text-5xl p-4 px-6 rounded-sm shadow-md animate-pulse flex flex-col gap-6">
     <div>❤️</div>
     <div>🔥</div>
     <div>🥗</div> 
    </div>
  </div>

</div>


    
    </div>

  );
}
