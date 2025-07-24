import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    details:{type:String},
    email:{type:String}
})

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

export default Recipe;