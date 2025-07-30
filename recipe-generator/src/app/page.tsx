
"use client";
import { CarouselPlugin } from "@/components/ui/carouselPlugin";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import { parseRecipe, ParsedRecipe } from "@/app/utils/parseRecipe";
import { createBrowClient } from '../../lib/supabase-browser';
import LoadingAnimation from "@/components/ui/loadingAnimation";
import TeaLoading from "@/components/ui/teaLoading";
import Link from "next/link";



export default function Home() {
  
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false); 
  const [isSaved, setIsSaved] = useState(false);
  const [savingLoading, setSavingLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const [recipe, setRecipe] = useState<ParsedRecipe | null>(null);
  const n8n_url = process.env.NEXT_PUBLIC_N8N_URL!;

  const { user, setUser, login, setLogin } = useUserContext();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/auth/user');
      if (res.status === 200) {
        const data = await res.json();
        setLogin(true);
        setUser(data.message);
      } else {
        setLogin(false);
        setUser(undefined);
      }
    }

    async function checkMagicLink() {
      fetchUser();
    }

    checkMagicLink();
   
  }, [setLogin, setUser]);



  const handleSubmit = async (e: React.FormEvent)=>{

    e.preventDefault();
    if(prompt === ''){
      alert("Add prompt first");
      return
    }
    setLoading(true);
    const pointsToNote =  "If the user's prompt is wrong or unclear, respond with the best possible interpretation and place the output in the 'intro' field.";
    try{
      const response = await axios.post(n8n_url,{"query":prompt,"pointsToNote":pointsToNote});
      console.log('Workflow triggered:', response.data);
     
      const rawRecipe = response.data;
      const parsed = parseRecipe(rawRecipe);
      console.log(parsed)
      setResult(rawRecipe);
      setRecipe(parsed);
      setIsSaved(false);

      } catch (error) {
      console.error('Error triggering workflow:', error);
    }
    setHasGenerated(true);
    setLoading(false);
  }

  
  const handleFakePrompts = async (value: string)=>{
  
    setLoading(true);
    const pointsToNote =  "If the user's prompt is wrong or unclear, respond with the best possible interpretation and place the output in the 'intro' field.";
    try{
      const response = await axios.post(n8n_url,{"query":value,"pointsToNote":pointsToNote});
      console.log('Workflow triggered:', response.data);
     
      const rawRecipe = response.data;
      const parsed = parseRecipe(rawRecipe);
      console.log(parsed)
      setResult(rawRecipe);
      setRecipe(parsed);
      setIsSaved(false);

      } catch (error) {
      console.error('Error triggering workflow:', error);
    }
    setLoading(false);
  }

  const saveRecipe = async () => {
    try {
      if (!user?.email) {
        alert("You are not logged in. Please log in to save recipes.");
        return;
      }
      setSavingLoading(true); 
      const res = await axios.post('/api/recipe/save', {
        email: user.email,
        prompt: prompt, 
        ...recipe,      
      });

      if (res.status === 200) {
        console.log('Saved recipe successfully');
        setIsSaved(true);
      } else {
        console.log('Failed to save recipe');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe. Please check the console for details.');
    }
    finally {
    setSavingLoading(false); 
  }
  };

  return (
    <div className="flex flex-col">
     
  <div className="flex flex-col md:flex-row items-center md:items-start max-w-6xl mx-auto px-4 py-8 gap-10">
  {/* Left: Carousel */}
  <div className="w-full md:w-1/2 flex justify-center md:justify-start md:mt-5">
    <CarouselPlugin />
  </div>

  {/* Right: Headings */}
  <div className="w-full md:w-1/2 text-center md:text-left md:ms-8">
    <h1 className="font-shadow text-4xl md:text-7xl text-amber-800 mb-4 md:my-16 tracking-wider font-bold">Dish Genie</h1>
    <h2 className="font-shadow text-3xl md:text-5xl font-bold tracking-wide">Generate a recipe using AI</h2>
  </div>
</div>



<h1 className="font-shadow text-3xl md:text-4xl text-center mt-10 font-bold tracking-wider">
  Hi {user?.email}, Write your prompt
</h1>

<div className="flex flex-col items-center justify-center bg-amber-100 mx-4 md:mx-13 mt-10 p-6 md:p-8 rounded-lg">
  <form onSubmit={handleSubmit} className="w-full max-w-5xl">
    <div className="relative w-full">
      <textarea
        className="w-full resize-none pr-14 bg-white shadow-md rounded-3xl px-6 py-4 text-base transition-all duration-200 focus:ring-2 focus:ring-amber-400 min-h-[56px] max-h-[200px] overflow-y-auto"
        value={prompt}
        onChange={(e) => {
          const textarea = e.target as HTMLTextAreaElement;
          textarea.style.height = 'auto';
          textarea.style.height = `${textarea.scrollHeight}px`; 
          setPrompt(textarea.value);
        }}
        placeholder="Type your prompt here..."
        rows={1}
      />

      <button
        type="submit"
        className="absolute right-3 top-7 pb-1 mb-2 -translate-y-1/2 bg-green-500 text-white hover:bg-green-400 font-semibold rounded-2xl w-10 h-10 flex items-center justify-center shadow-md transition-all duration-200 focus:ring-2"
      >
        <span className="text-2xl">→</span>
      </button>
    </div>
  </form>
</div>



<div className="flex flex-col justify-center items-center w-full">

   
   {!hasGenerated && (
<div className="w-11/12 h-full bg-amber-100 mx-4 md:mx-14 mt-10 p-6 md:p-8 rounded-lg">
 <div className="font-shadow text-2xl font-bold tracking-wider ms-2 py-4 text-amber-800">Dont know what to write try these prompts</div>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full font-shadow">
   {[
  "Recipe of falooda",
  "Recipe of any chicken dish",
  "Give me recipe that has potatoes and veggies",
  "Chocolate Milkshake",
].map((text, index) => (
  <button
    key={index}
    onClick={() => {
      handleFakePrompts(text);
    }}
    className="bg-amber-200/30 backdrop-blur-md border border-amber-300 shadow-md rounded-2xl h-48 w-full p-5 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-amber-400 cursor-pointer flex items-center justify-center text-center"
  >
    <span className="text-xl md:text-2xl tracking-wide md:leading-snug text-amber-900 font-semibold">
      {text}
    </span>
  </button>
))}

  </div>
</div>)}

  {loading && (<div className="w-1/2 h-1/2">
       <LoadingAnimation/>
    </div>
    )}
</div>
  
  <div className="flex flex-col items-center justify-center mx-0 md:mx-14 my-10  rounded-lg">

 

  {/* Show result only if not loading and result exists */}
  {result && recipe && (
    <div className="m-0 md:m-0 p-6 md:p-10 w-full max-w-5xl  bg-amber-100 animate-fade-in  rounded-lg">
      <Card className="mt-2 w-full">
        <CardHeader>
          <CardDescription >{recipe.intro}</CardDescription>
          <CardTitle className="text-xl md:text-3xl font-bold font-shadow tracking-wide">{recipe.name}</CardTitle>
          <CardDescription className="text-sm md:text-base">{recipe.description}</CardDescription>
        </CardHeader>
        <CardContent>
  {recipe.ingredients.length > 0 && (
    <div>
      <h3 className="font-semibold text-lg">🍽 Ingredients:</h3>
      <ul className="list-disc ml-5 text-sm md:text-base">
        {recipe.ingredients.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  )}

  {recipe.instructions.length > 0 && (
    <div className="mt-4">
      <h3 className="font-semibold text-lg">👨‍🍳 Instructions:</h3>
      <ol className="list-decimal ml-5 text-sm md:text-base">
        {recipe.instructions.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </div>
  )}

  {(recipe.preparationTime || recipe.cookingTime || recipe.servingSize) && (
    <div className="mt-4 space-y-1 text-sm md:text-base text-gray-700">
      {recipe.preparationTime && (
        <p><strong>Prep Time:</strong> {recipe.preparationTime}</p>
      )}
      {recipe.cookingTime && (
        <p><strong>Cook Time:</strong> {recipe.cookingTime}</p>
      )}
      {recipe.servingSize && (
        <p><strong>Serving Size:</strong> {recipe.servingSize}</p>
      )}
    </div>
  )}

  {recipe.notes && (
    <div className="mt-4">
      <h4 className="font-semibold text-lg">📌 Notes:</h4>
      <p>{recipe.notes}</p>
    </div>
  )}
</CardContent>

        <CardFooter>
              {login && !isSaved && (
        savingLoading ? (
          <div className="w-full md:w-auto mt-4">
           <div className="progress-bar" />
          </div>
        ) : (
          <Button className=" bg-amber-600 hover:bg-amber-500" onClick={saveRecipe}>Save</Button>
        )
      )}

      {isSaved && (
        <Button disabled variant="outline">Saved</Button>
      )}

        </CardFooter>
      </Card>
    </div>
  )}
</div>

 

{/* Section 1: Start Saving Your Recipes */}
<div className="flex flex-col-reverse md:flex-row items-center justify-center p-6 md:p-12 bg-amber-200/30 backdrop-blur-lg border border-amber-300 shadow-md md:mx-14 md:mt-20 md:rounded-4xl transition-all">
  {/* Text Section */}
  <div className="w-full md:w-1/2 text-center md:text-left md:ms-16">
    <Link href="/viewRecipe"><h1 className="font-shadow text-3xl md:text-5xl mb-4 font-bold tracking-wider text-amber-800">
      Start Saving Your Recipes!
    </h1></Link>
    <p className="text-gray-700 mb-6 text-lg md:text-xl">
      Easily save, view, and manage your favorite recipes all in one place.
    </p>
  </div>

  {/* Image + Link */}
  <div className="w-full md:w-1/2 flex flex-col items-center gap-3 mb-6 md:mb-0">
    <img src="/cutlery.png" alt="cooking icon" className="w-48 md:w-44 lg:w-60" />
  
  </div>
</div>

{/* Section 2: Personalise it */}
<div className="flex flex-col-reverse md:flex-row items-center justify-center p-6 my-14 md:p-12 bg-amber-200/30 backdrop-blur-lg border border-amber-300 shadow-md md:mx-14 md:rounded-4xl md:my-24 transition-all">
  {/* Text Section */}
  <div className="w-full md:w-1/2 text-center md:text-left md:ms-16">
    <Link href="/events"><h1 className="font-shadow text-3xl md:text-5xl mb-4 font-bold text-amber-800 tracking-wider">
      Personalise it
    </h1></Link>
    <p className="text-gray-700 mb-6 text-lg md:text-xl">
      Personalize it by adding your own events — whether it is a wedding, Eid, Christmas, or anything special!
    </p>
  </div>

  {/* Image + Link */}
  <div className="w-full md:w-1/2 flex flex-col items-center gap-3 mb-6 md:mb-0">
    <img src="/cal.png" alt="calendar icon" className="w-48 md:w-44 lg:w-60" />
  
  </div>
</div>


   


    
    </div>

  );
}
