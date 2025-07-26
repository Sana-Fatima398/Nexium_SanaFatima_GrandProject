
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



export default function Home() {
  
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false); 
  const [isSaved, setIsSaved] = useState(false);
  
  const [recipe, setRecipe] = useState<ParsedRecipe | null>(null);

  const { user, login } = useUserContext();

  const handleSubmit = async (e: React.FormEvent)=>{

    e.preventDefault();
    if(prompt === ''){
      alert("Add prompy first");
      return
    }
    setLoading(true);
    const pointsToNote =  'The recipe that you produce should be a json object { "intro": string, "name": string,"description":string,"ingredients":string[],"instructions": string[], "servingSize": string, "cookingTime": string, "preparationTime": string, "notes": string }. If the prompt is wrong, unclear just response politely that they should enter the prompt clearly.';
    try{
      const response = await axios.post("http://localhost:5678/webhook/8585b14b-bd38-49c8-bb1c-9d88fc6912c5",{"query":prompt,"pointsToNote":pointsToNote});
      console.log('Workflow triggered:', response.data);
     
      const rawRecipe = response.data;
      const parsed = parseRecipe(rawRecipe);
      console.log(parsed)
      setResult(rawRecipe);
      setRecipe(parsed);

      } catch (error) {
      console.error('Error triggering workflow:', error);
    }
    setLoading(false);
  }

  const saveRecipe = async () => {
    try {
      if (!user?.email) {
        alert("Missing recipe or user info.");
        return;
      }

      console.log(user.email);
      console.log(prompt);
      console.log(recipe);
      

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
  };

  return (
    <div className="flex flex-col">
  <div className="flex flex-col md:flex-row items-center md:items-start max-w-6xl mx-auto px-4 py-8 gap-10">
  {/* Left: Carousel */}
  <div className="w-full md:w-1/2 flex justify-center md:justify-start">
    <CarouselPlugin />
  </div>

  {/* Right: Headings */}
  <div className="w-full md:w-1/2 text-center md:text-left">
    <h1 className="font-shadow text-4xl md:text-6xl text-amber-800 mb-4">Dish Genie</h1>
    <h2 className="font-shadow text-2xl md:text-4xl">Generate a recipe using AI</h2>
  </div>
</div>



<h1 className="font-shadow text-4xl md:text-5xl text-center mt-10">Write your prompt</h1>

<div className="flex flex-col items-center justify-center bg-amber-100 mx-4 md:mx-14 my-10 p-6 md:p-8 rounded-lg">
  <form onSubmit={handleSubmit} className="w-full max-w-5xl">
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
      <Input
        className="w-full md:w-11/12 bg-white shadow-md transition-all duration-200 focus:ring-2 focus:ring-amber-400"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your prompt here..."
      />
      <Button
        type="submit"
        className="w-full md:w-1/12 bg-green-500 text-white font-semibold shadow-md transition-all duration-200 focus:ring-2 rounded-full"
      >
        <span className="text-3xl mb-1">→</span>
      </Button>
    </div>
  </form>
</div>


    <div className="flex flex-col items-center justify-center bg-amber-100 mx-0 md:mx-0 my-10 p-6 md:p-3 rounded-lg w-full">

  {/* Show progress bar only while loading */}
  {loading && (
    <div className="progress-bar w-[60%] mt-5 h-2 bg-amber-300 rounded animate-pulse" />
  )}

  {/* Show result only if not loading and result exists */}
  {result && !loading && recipe && (
    <div className="m-0 md:m-0 p-0 md:p-0 w-full max-w-5xl animate-fade-in">
      <Card className="mt-2 w-full">
        <CardHeader>
          <CardDescription>{recipe.intro}</CardDescription>
          <CardTitle className="text-xl md:text-3xl">{recipe.name}</CardTitle>
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
            <Button onClick={saveRecipe}>Save</Button>
          )}
          {isSaved && (
            <Button disabled variant="outline">Saved</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )}
</div>

 

      <div className="flex flex-row items-center justify-center p-12 bg-amber-100">

        <div className="h-4/5">
        <div className="w-1/2">
            <h1 className="font-shadow text-5xl mb-4 text-center">Start Saving Your Recipes!</h1>
            <p className="text-gray-600 mb-8 text-center text-lg">Easily bookmark, view, and manage your favorite recipes all in one place.</p>
        </div>
        <div className="w-1/2"></div>
        </div>
        <div className="w-1/5"></div>
         
           
      </div>

     <div className="flex flex-col gap-16 items-center justify-center p-10">

  {/* Section 1: Personalized Heading + Image */}
  <div className="flex flex-col md:flex-row items-center justify-center gap-0 w-full max-w-5xl my-10">
    <div className="m-10">
          <h1 className="font-shadow text-5xl md:text-6xl text-amber-800 font-semibold text-center md:text-left m-5">
      Personalise it
    </h1>
    <p className="font-shadow text-3xl m-5">Personalize it by adding your own events — whether it is a wedding, Eid, Christmas, or anything special!</p>

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
    <p className="font-shadow text-3xl my-5">Personalize it by adding your own events — whether it is a wedding, Eid, Christmas, or anything special!</p>
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
