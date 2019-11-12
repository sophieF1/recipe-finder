const { DatabaseAPI } = require('./recipeDb')
const DB_PATH = ':memory'
const dbRecipeSchema = require('./recipeDbSchema')
const recipeData = require('./recipeData')
const Promise = require('bluebird')

const DB = new DatabaseAPI(DB_PATH, dbRecipeSchema.recipeDbSchema)

// ADD RECIPES
function addRecipes () {
    return Promise.all(recipeData.map((recipe) => {
        return DB.addRecipe(recipe)
    }))
}

addRecipes()

// CLOSE THE DB
DB.closeDb()