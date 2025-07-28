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

export function parseRecipe(data: Partial<ParsedRecipe>): ParsedRecipe {
  return {
    intro: typeof data.intro === "string" ? data.intro : "",
    name: typeof data.name === "string" ? data.name : "",
    description: typeof data.description === "string" ? data.description : "",
    ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
    instructions: Array.isArray(data.instructions) ? data.instructions : [],
    servingSize: typeof data.servingSize === "string" ? data.servingSize : "",
    cookingTime: typeof data.cookingTime === "string" ? data.cookingTime : "",
    preparationTime: typeof data.preparationTime === "string" ? data.preparationTime : "",
    notes: typeof data.notes === "string" ? data.notes : "",
  };
}
