import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    recipeId:{type:String},
    name:{type:String, required:true},
    tags:{type:String, required:false},
    indegredients:{type:String},
    instructions:{type:String},
    prepTime:{type:String},
    cookTime:{type:String},
    servingSize:{type:String},
    type:{type:Boolean, default:false}
})

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

export default Recipe;