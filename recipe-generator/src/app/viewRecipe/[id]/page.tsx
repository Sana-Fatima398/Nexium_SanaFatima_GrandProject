'use client';
import { useState, useEffect } from "react";
import { useRecipeContext } from "@/app/context/RecipeContext";
import { useParams } from 'next/navigation';

interface Recipe{
    _id:string;
    details:string;
    email:string;
}
export default function Recipe(){
    const { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe>();
    useEffect(() => {
        const fetchRecipe = async () => {
        try {
            const res = await fetch('/api/recipe/readById', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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

    return (
        <div>
            <div className="flex flex-col w-full h-96 relative overflow-hidden">
                 <img
                    src="/food-pizza-wallpaper-preview.jpg"
                    alt="Background"
                    className="absolute top-0 left-0 w-full h-3/4 object-cover "
                />
                  <div className="absolute top-0 left-0 w-full h-3/4 bg-white/10 backdrop-blur-md" />
                <div className="flex flex-row w-3/4 h-full mx-auto mt-24 gap-8 p-3 bg-white/10 backdrop-blur-md rounded-lg">
                    
                     <div className="bg-amber-300 w-6/12 rounded-2xl m-3">
                      <img src="/food-pizza-wallpaper-preview.jpg" className="h-full w-full object-cover rounded-lg"/>
                     
                     </div>
                    <div className="flex flex-col w-6/12 gap-4 p-3">
                        <div  className="bg-amber-500 h-3/5 rounded-2xl shadow-md"></div>
                        <div className="bg-amber-100 h-2/5 rounded-2xl shadow-md"></div>
                    </div> 
                   
                </div>


            </div>
            {recipe ? (
        <>
          <h1>{recipe.details}</h1>
          <p>{recipe.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}

            <div className="m-20">
                <div><p className="text-5xl mb-7">Indegredients</p></div>
                <div className="bg-amber-300 h-60 rounded-lg"></div>

            </div>

            <div className="m-20">
                <div><p className="text-5xl mb-7">Instructions</p></div>
                <div className="bg-amber-300 h-60 rounded-lg"></div>

            </div>
            
        </div>
    );
}