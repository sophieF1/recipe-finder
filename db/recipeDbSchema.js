module.exports.recipeDbSchema = `CREATE TABLE IF NOT EXISTS Recipes (   
    id integer PRIMARY KEY AUTOINCREMENT,
    dateTime integer, 
    name text,
    img text,
    peopleCount integer,
    ingredients text,
    veg integer, 
    instructions text
);`