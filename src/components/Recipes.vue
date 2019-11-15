<template>
  <v-container grid-list-lg>
    <v-layout row>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12 md4 v-for="recipe in recipes" :key="recipe.id">
        <v-card>
          <v-responsive>
            <v-img :src="getImgUrl(recipe)" height="300px">
             <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <p class="headline white--white">{{ setVeg(recipe) }}</p>
                </v-flex>
              </v-layout>
            </v-container>
            </v-img>
          </v-responsive>
               <v-card-text>
                        <div class="title black--text">{{recipe.name}}</div>
                        <div class="subheading black--text">Ingredients</div>
                        <ul>
                          <li class="black--text">{{ splitter(recipe.ingredients) }} </li>
                          <!-- <li class="black--text" v-for="(ingredient, i) in ingredients[0]" :key="i">{{ingredient}} </li> -->
                        </ul>
                        <div class="subheading black--text">Serves {{recipe.peopleCount}}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn icon @click="show = !show">
                  <v-icon>{{ show  ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                 <!-- <div v-show="showRecipeIngredient == recipe.id"> -->
                <div v-show="show">
                  <v-card-text ref="method">
                      <div class="subheading black--text">Method</div>
                      <div class="media-body black--text">{{recipe.instructions}}</div>
                      <div class="media-body black--text"> created on {{recipe.dateTime}}</div>
                      <v-card-actions>
                      <div class="close"><v-btn outlined block dark color="blue" @click="deleteRecipe(recipe.id)">Delete</v-btn></div>
                      <!-- <div class="close"><v-btn outlined block dark color="blue" @click="updateRecipe(recipe)">Update</v-btn></div> -->
                    </v-card-actions>
                  </v-card-text>
                </div>
              </v-expand-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const API_URL = 'http://localhost:4080/recipes'

export default {
  name: 'Recipes',
  data: () => ({
    error: '',
    recipes: [],
    show: false,
    showRecipeIngredient: null,
    ingredients: []
  }),
  mounted () {
    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        this.recipes = result
        this.splitter(this.recipes)
      })
  },
  methods: {
    toggle (id) {
      this.showRecipeIngredient = id
      this.show = true
    },
    getImgUrl (recipe) {
      return require('@/assets/' + recipe.img)
    },
    setVeg (recipe) {
      if (recipe.veg === 1) {
        return 'V'
      }
    },
    splitter (ingredient) {
      return ingredient.split([', '])
    },
    deleteRecipe (id) {
      fetch(API_URL + '/' + id, {
        method: 'DELETE'
      }).then(() => {
        console.log('Recipe deleted')
        this.removeCard(id)
      }).catch(err => {
        console.error(err)
      })
    },
    updateRecipe (recipe) {
      fetch(API_URL + '/' + recipe.id, {
        method: 'PUT',
        body: JSON.stringify(recipe),
        headers: {
          'content-type': 'application/json'
        }
      }).then(() => {
        console.log('Recipe updated')
      }).catch(err => {
        console.error(err)
      })
    },
    removeCard (index) {
      this.recipes.splice(index, 1)
      this.$router.go()
    }
  }
}

</script>
<style scoped>
</style>
