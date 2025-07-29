'use client';
import { Button } from "@/components/ui/button";
import  Link from "next/link";
import { useEffect,useState } from "react";
import { useRecipeContext } from '../context/RecipeContext';
import { useUserContext } from "../context/UserContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function RecipesPage(){

    const { recipes, setRecipes } = useRecipeContext(); 
    const { user,login } = useUserContext();
    const [loading, setLoading] = useState(true);
    const [tobeDeleted, setToBeDeleted] = useState("");
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

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
   
    const handleDelete = async(id: string) =>{
        
        try {
        const res = await fetch("/api/recipe/delete", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ recipeId: id })
        });

        if (res.status !== 200)  alert("Recipe can not be delelted!");
        else{
            setRecipes((prev) => prev.filter((r) => r._id !== id));
            setShowDeleteAlert(true);
            setTimeout(() => setShowDeleteAlert(false), 3000);
        }
        } catch (error) {
        console.error("Error deleting recipe:", error);
        }
    
    }


    return (
         <div className="container mx-auto p-4">
            <div className=" flex md:flex-row flex-col w-full">           
                <div  className="w-1/2">
                    <h1 className="text-6xl font-shadow m-10 text-amber-800">Recipes</h1>
                </div>
      
                <div className="w-1/2 flex justify-end items-center ms-10">
                        {showDeleteAlert && (
                        <Alert variant="destructive" className="mb-4 w-fit bg-amber-100">
                            <AlertTitle>Deleted!</AlertTitle>
                            <AlertDescription>Your recipe has been successfully deleted.</AlertDescription>
                        </Alert>
                        )}
                </div>
            </div>
 
            
        {login ? (
            loading ? (  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
  {[...Array(6)].map((_, index) => (
    <div
      key={index}
      className="flex flex-col items-center justify-center w-full h-64 bg-white p-4 rounded-xl shadow-lg transition-all duration-300 pb-7 gap-2 border border-transparent"
    >
  
      <div className="flex flex-col w-full justify-center items-center mt-4 mb-1 text-center">
        <Skeleton className="h-8 w-3/4 rounded bg-amber-100" />
      </div>

   
      <div className="flex flex-col w-full justify-center items-center px-4">
        
        <Skeleton className="h-6 w-5/6 mb-1 rounded bg-amber-100" />
      </div>


      <div className="flex flex-col gap-2 w-full px-8 mt-4">
        <Skeleton className="h-10 w-full rounded-lg bg-amber-100" />
        <Skeleton className="h-10 w-full rounded-lg bg-amber-100" />
      </div>
    </div>
  ))}
</div>):
            recipes.length !== 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
  {recipes.map((recipe) => (
    <div
      key={recipe._id}
      className="flex flex-col items-center justify-center w-full h-64 bg-white p-4 rounded-xl shadow-lg transition-all duration-300 pb-7 gap-2 hover:animate-out border border-transparent hover:border-amber-800"
    >
        <div className="flex flex-col w-full justify-center items-center text-2xl font-semibold font-shadow tracking-widest mt-4 mb-1 text-center">
            {recipe.name}
        </div>
        <div className="flex flex-col w-full justify-center items-center px-4"> 
             <p className="text-md text-gray-600 text-center"><span className="italic text-gray-900">prompt:</span> {recipe.prompt}
            </p>
        </div>
    
        <div className="flex flex-col gap-2 w-full px-10">
        <Link href={`/viewRecipe/${recipe._id}`}>
            <Button className="w-full mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg">
            View
            </Button>
        </Link>
        <Button
            variant="destructive"
            className="w-full px-4 py-2 bg-red-400 hover:bg-red-300 text-white rounded-lg" 
            onClick={()=>{
                handleDelete(recipe._id);
                }}
            >
                Delete
            </Button>
        </div>
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