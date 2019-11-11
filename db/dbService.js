const { DatabaseAPI } = require('./recipeDb')
const DB_PATH = ':memory'
const dbRecipeSchema = require('./recipeDbSchema')
const recipeData = require('./recipeData')
const Promise = require('bluebird')

const DB = new DatabaseAPI(DB_PATH, dbRecipeSchema.recipeDbSchema)

// ADD
function addRecipes() {
    return Promise.all(recipeData.map((recipe) => {
        const { name, img, peopleCount, ingredients, veg, instructions } = recipe
        console.log('recipe in dbservice', recipe)
        return DB.addRecipe(name, img, peopleCount, ingredients, veg, instructions)
    }))
}

//addRecipes()


function listAllRecipes(recipes) {
    recipes.forEach(recipe => {
        console.log('listRecipe')
        console.log(recipe.name)
    })
}
// GET ALL
// DB.getAll()

// DELETE ALL
//DB.clearDb()

// DELETE SPECIFIC RECIPE 
//DB.deleteRecipe(1)

// UPDATE RECIPE 

// CLOSE THE DB
DB.closeDb()