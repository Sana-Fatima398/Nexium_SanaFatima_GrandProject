export type ParsedRecipe = {
  intro: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  servingSize: string;
  cookingTime: string;
  preparationTime: string;
  notes: string;
};

export function parseRecipe(str: string): ParsedRecipe {
  str = str.replace(/\r\n/g, "\n").trim();

  const defaultRecipe: ParsedRecipe = {
    intro: str,
    name: "",
    description: "",
    ingredients: [],
    instructions: [],
    servingSize: "",
    cookingTime: "",
    preparationTime: "",
    notes: "",
  };

  // Extract JSON block
  const jsonMatch = str.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (!jsonMatch) {
    return defaultRecipe;
  }

  try {
    const jsonStr = jsonMatch[1].trim();
    const recipeData = JSON.parse(jsonStr);

    return {
      intro: str.slice(0, jsonMatch.index).trim(),
      name: recipeData.name || "",
      description: recipeData.description || "",
      ingredients: Array.isArray(recipeData.ingredients) ? recipeData.ingredients : [],
      instructions: Array.isArray(recipeData.instructions) ? recipeData.instructions : [],
      servingSize: recipeData.servingSize || "",
      cookingTime: recipeData.cookingTime || "",
      preparationTime: recipeData.preparationTime || "",
      notes: recipeData.notes || "",
    };
  } catch (error) {
    return defaultRecipe;
  }
}
