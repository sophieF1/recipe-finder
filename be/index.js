const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const { DatabaseAPI } = require('../db/recipeDb')
const DB_PATH = ':memory'
const dbRecipeSchema = require('../db/recipeDbSchema')
const recipes = new DatabaseAPI(DB_PATH, dbRecipeSchema.recipeDbSchema)

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    message: 'You are online!'
  })
})

app.get('/recipes', (req, res) => {
  recipes.getAll().then((recipes) => {
    res.json(recipes)
  }).catch((error) => {
    res.json(error)
  })
})

app.post('/recipes', (req, res) => {
  recipes.addRecipe(req.body).then((recipe) => {
    res.json(recipe)
  }).catch((error) => {
    res.status(500)
    res.json(error)
  })
})

app.put('/recipes/:id', (req, res) => {
  recipes.updateRecipe(req.body).then((recipe) => {
    res.json(recipe)
  }).catch((error) => {
    res.status(500)
    res.json(error)
  })
})

app.delete('/recipes/:id', (req, res) => {
  recipes.deleteRecipe(req.params.id).then(() => {
    res.json('removed')
  }).catch((error) => {
    res.status(500)
    res.json(error)
  })
})

const port = process.env.PORT || 4080
app.listen(port, () => {
  console.log(`listening on ${port}`)
})

module.exports = app
