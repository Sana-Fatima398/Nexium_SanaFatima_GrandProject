'use client';
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';

type Recipe = {
  email: string;
  prompt: string;
  intro?: string;
  name: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  servingSize?: string;
  cookingTime?: string;
  preparationTime?: string;
  notes?: string;
  createdAt?: string;
};

export default function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch('/api/recipe/readById', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        console.error("Failed to fetch recipe:", err);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="text-center text-xl my-10">Loading recipe...</p>;

  return (
    <div>
        <div className="flex flex-col w-full relative overflow-hidden">
  {/* Background Image Layer */}
  <img
    src="/food-pizza-wallpaper-preview.jpg"
    alt="Background"
    className="absolute top-0 left-0 w-full h-3/4 object-cover z-0"
  />
  <div className="absolute top-0 left-0 w-full h-3/4 bg-white/10 backdrop-blur-md z-10" />

  {/* Foreground Content */}
  <div className="relative z-20 flex flex-col md:flex-row w-full md:w-3/4 mx-auto mt-24 gap-8 p-3 bg-white/10 backdrop-blur-md rounded-lg">
   

    {/* Right - Details */}
    <div className="flex flex-col w-full md:w-6/12 gap-4 p-4 bg-white/70 rounded-2xl shadow-md overflow-y-auto max-h-[34rem]">
      {/* First Section - Basic Details */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-amber-700 font-shadow">{recipe.name}</h2>
        <p className="text-sm"><strong>Prompt:</strong> <i>{recipe.prompt}</i></p>
        <p className="text-xs italic text-gray-700">
          Created on: {recipe.createdAt ? new Date(recipe.createdAt).toLocaleDateString() : "----"}
        </p>
      </div>

      {/* Second Section - Time & Serving Details */}
      <div className="flex flex-col gap-2 border-t pt-3 text-sm">
        <p><strong>Prep Time:</strong> {recipe.preparationTime?.trim() || "----"}</p>
        <p><strong>Cook Time:</strong> {recipe.cookingTime?.trim() || "----"}</p>
        <p><strong>Serves:</strong> {recipe.servingSize?.trim() || "----"}</p>
      </div>
    </div>
 {/* Left - Image */}
    <div className="bg-amber-300 w-full md:w-6/12 rounded-2xl overflow-hidden">
      <img
        src="/food-pizza-wallpaper-preview.jpg"
        className="h-64 md:h-full w-full object-cover rounded-lg"
        alt="Recipe"
      />
    </div>


  </div>
</div>


     {/* Intro & Description */}
<div className="px-4 py-8 md:px-20">
  <p className="text-2xl md:text-5xl mb-5 font-bold text-amber-700 break-words font-shadow">Overview</p>
  <div className="bg-white rounded-lg shadow-md p-6 space-y-2 text-gray-800 text-sm">
    <p><strong>Intro:</strong> {recipe.intro?.trim() || "----"}</p>
    <p><strong>Description:</strong> {recipe.description?.trim() || "----"}</p>
  </div>
</div>

{/* Ingredients */}
<div className="px-4 py-8 md:px-20">
  <p className="text-2xl md:text-5xl mb-5 font-bold text-amber-700 break-words font-shadow">Ingredients</p>
  <div className="bg-white rounded-lg shadow-md p-6 space-y-2 text-gray-800">
    {recipe.ingredients.length ? (
      <ul className="list-disc list-inside">
        {recipe.ingredients.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    ) : (
      <p>No ingredients listed.</p>
    )}
  </div>
</div>

{/* Instructions */}
<div className="px-4 py-8 md:px-20">
  <p className="text-2xl md:text-5xl mb-5 font-bold text-amber-700 break-words font-shadow">Instructions</p>
  <div className="bg-white rounded-lg shadow-md p-6 space-y-2 text-gray-800">
    {recipe.instructions.length ? (
      <ol className="list-decimal list-inside space-y-1">
        {recipe.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    ) : (
      <p>No instructions provided.</p>
    )}
  </div>
</div>

{/* Time & Serving Info */}
<div className="px-4 py-8 md:px-20">
  <p className="text-2xl md:text-5xl mb-5 font-bold text-amber-700 break-words font-shadow">Timing & Serving</p>
  <div className="bg-white rounded-lg shadow-md p-6 space-y-2 text-gray-800 text-sm">
    <p><strong>Prep Time:</strong> {recipe.preparationTime?.trim() || "----"}</p>
    <p><strong>Cook Time:</strong> {recipe.cookingTime?.trim() || "----"}</p>
    <p><strong>Serves:</strong> {recipe.servingSize?.trim() || "----"}</p>
  </div>
</div>

{/* Notes */}
<div className="px-4 py-8 md:px-20">
  <p className="text-2xl md:text-5xl mb-5 font-bold text-amber-700 break-words font-shadow">Notes</p>
  <div className="bg-white rounded-lg shadow-md p-6 text-sm text-amber-950">
    {recipe.notes?.trim() || "----"}
  </div>
</div>


    </div>
  );
}
