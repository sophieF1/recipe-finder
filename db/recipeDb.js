const sqlite3 = require('sqlite3').verbose()
const Promise = require('bluebird')
const dateFetcher = require('./date')

function DatabaseAPI(DB_PATH, dbSchema) {
  const DB = new sqlite3.Database(DB_PATH, function (err) {
    if (err) {
      console.log(err)
      return
    }
    console.log('Connected to ' + DB_PATH + ' database.')
  })
  DB.exec(dbSchema, function (err) {
    if (err) {
      console.log(err)
    }
  })
  return {

    addRecipe: function (recipe) {
      const name = recipe.name
      const img = recipe.img
      const peopleCount = recipe.peopleCount
      const ingredients = recipe.ingredients
      const veg = recipe.veg
      const instructions = recipe.instructions
      const dateTime = dateFetcher.getDate(new Date())
      const sql = `INSERT INTO Recipes (dateTime, name, img, peopleCount, ingredients, veg, instructions)
      VALUES (?, ?, ?, ?, ?, ?, ?) `
      return new Promise((resolve, reject) => {
        DB.run(sql, [dateTime, name, img, peopleCount, ingredients, veg, instructions], function (error) {
          if (error) {
            console.log(error)
            reject(error)
          } else {
            console.log('Name: ' + this.name)
            console.log('# of Row Changes: ' + this.changes)
            resolve()
          }
        })
      })
    },

    getAll: function () {
      console.log('Get all recipes from db')
      let sql = `SELECT * FROM Recipes`

      return new Promise((resolve, reject) => {
        DB.all(sql, [], function (error, rows) {
          if (error) {
            console.log(error)
            reject(error)
          } else {
            resolve(rows)
          }

        })
      })
    },

    updateRecipe: function (recipe) {
      console.log('Update recipe in db')
      const id = recipe.id
      const name = recipe.name
      const img = recipe.img
      const peopleCount = recipe.peopleCount
      const ingredients = recipe.ingredients
      const veg = recipe.veg
      const instructions = recipe.instructions
      const dateTime = dateFetcher.getDate(new Date())
      const sql = `UPDATE Recipes
           SET dateTime = ?, 
            name = ?,
            img = ?,
            peopleCount = ?,
            ingredients = ?,
            veg = ?,
            instructions = ?
          WHERE id = ?`
      return new Promise((resolve, reject) => {
        DB.run(sql, [dateTime, name, img, peopleCount, ingredients, veg, instructions, id], function (error) {
          if (error) {
            console.log(error)
            reject(error)
          } else {
            console.log("Name: " + this.name)
            console.log("# of Row Changes: " + this.changes)
            resolve()
          }
        })
      })
    },

    deleteRecipe: function (id) {
      console.log('Delete recipe from db')
      const sql = `DELETE FROM Recipes WHERE id = ?`
      return new Promise((resolve, reject) => {
        DB.run(sql, [id], function (error) {
          if (error) {
            console.log(error)
            reject(error)
          } else {
            console.log("# of Row Changes: " + this.changes)
            resolve()
          }
        })
      })
    },

    clearDb: function () {
      console.log('Delete all in db')
      const sql = `DELETE FROM Recipes`
      return new Promise((resolve, reject) => {
        DB.run(sql, function (error) {
          if (error) {
            console.log(error)
            reject(error)
          } else {
            console.log("# of Row Changes: " + this.changes)
            resolve()
          }
        })
      })
    },

  closeDb: function () {
    console.log('Close db connection')
    DB.close()
  }
}
}
module.exports = { DatabaseAPI }
