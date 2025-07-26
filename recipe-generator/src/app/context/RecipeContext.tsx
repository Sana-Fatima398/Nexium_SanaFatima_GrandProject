'use client';

import { createContext, useContext, useState, ReactNode } from "react";
type Recipe = {
  _id: string;
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

type RecipeContextType = {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};
const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({children}: { children: ReactNode })=>{
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    return (
        <RecipeContext.Provider value={{recipes, setRecipes}}>
            {children}
        </RecipeContext.Provider>
    );

};

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipeContext must be used within a RecipeProvider");
  }
  return context;
};