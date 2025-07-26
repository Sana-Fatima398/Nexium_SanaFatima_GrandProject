import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  email: { type: String, required: true },            
  prompt: { type: String, required: true },            
  intro: { type: String },                             
  name: { type: String, required: true },
  description: { type: String },
  ingredients: { type: [String], default: [] },        
  instructions: { type: [String], default: [] },
  servingSize: { type: String },
  cookingTime: { type: String },
  preparationTime: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }, 
})

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

export default Recipe;