import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    
})

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

export default Recipe;