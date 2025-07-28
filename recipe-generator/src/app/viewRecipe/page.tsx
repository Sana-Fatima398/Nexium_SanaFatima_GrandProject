'use client';
import { Button } from "@/components/ui/button";
import  Link from "next/link";
import { useEffect,useState } from "react";
import { useRecipeContext } from '../context/RecipeContext';
import { useUserContext } from "../context/UserContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecipesPage(){

    const { recipes, setRecipes } = useRecipeContext(); 
    const { user,login } = useUserContext();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        const fetchRecipes = async () => {
             try {
                const res = await fetch("/api/recipe/read",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: user?.email })  
                });
                if (!res.ok) throw new Error("Failed to fetch recipes");
                const data = await res.json();
                setRecipes(data); 
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally{
                setLoading(false);
            }
        };

        fetchRecipes();

        
    }, [setRecipes, user]);
   



    return (
         <div className="container mx-auto p-4">
            
            <div>
                <h1 className="text-6xl font-shadow m-10 text-amber-800">Recipes</h1>
            </div>
      
      
            
        {login ? (
            loading ? (  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {[...Array(6)].map((_, index) => (
                    <div
                    key={index}
                    className="w-full max-w-xs h-96 bg-amber-100 p-4 rounded-xl shadow-lg flex flex-col justify-between"
                    >
                    <Skeleton className="w-full h-44 rounded-lg mb-4 bg-amber-50" />
                    <Skeleton className="h-8 w-2/3 mb-3 rounded bg-amber-50" />
                    <Skeleton className="h-6 w-3/4 mb-2 rounded bg-amber-50" />
                    <Skeleton className="h-6 w-1/2 mb-2 rounded bg-amber-50" />
                    <Skeleton className="h-12 w-28 mt-6 rounded-full bg-amber-50" />
                    </div>
                ))}
                </div>):
            recipes.length !== 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
  {recipes.map((recipe) => (
    <div
      key={recipe._id}
      className="w-full h-96 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-between"
    >
      <img
        src="/placeholder.jpg" // Replace with recipe.image or relevant image URL
        alt="Recipe Image"
        width={320}
        height={160}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="text-2xl font-semibold mb-1 font-shadow tracking-widest p-3 text-center">
        {recipe.name}
      </h3>
      <p className="text-md text-gray-600 text-center">{recipe.prompt}</p>

      <Link href={`/viewRecipe/${recipe._id}`}>
        <Button className="mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg">
          View
        </Button>
      </Link>
    </div>
  ))}
</div>

            ) : (
                <div className="flex flex-col justify-center items-center text-center py-6 my-5` font-shadow text-2xl md:text-5xl gap-4">
                    <div className="">
                        Not Saved any recipe until now.
                    </div>
                    <div className="">
                        Then start creating using <Link href="/" className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-bold">AI</Link>
                    </div>
                    <div className="">
                    <img src="chef.png" className="w-32 h-32 md:w-60 md:h-60"/>
                    </div>
                    
                </div>
            )
        ) : (
            <div className="flex flex-col justify-center items-center text-center py-6 my-10 font-shadow text-2xl md:text-5xl gap-4">
                <div className="">
                    Your saved recipes will be shown here
                </div>
                <div className="">
                    <a href="/account/signup" className="text-amber-500">Sign in to continue</a>
                </div>
                <div className="">
                 <img src="sticker.png" className="w-32 h-32 md:w-60 md:h-60"/>
                </div>
                 
            </div>
        )}
           

        </div>
    );
}