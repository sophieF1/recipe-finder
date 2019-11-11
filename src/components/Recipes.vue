<template>
  <v-container grid-list-lg>
    <v-layout row>
      <!-- <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5"><v-btn outline dark block color="blue" @click="addRecipeCard()">Add recipe</v-btn></v-flex> -->
    </v-layout>
    <!-- <div class="list-unstyled" v-for="recipe in recipes" :key="recipe.id">
      <li class="media">
        <img v-if="recipe.img" class="mr-3" :src="recipe.img" :alt="recipe.name">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{recipe.name}}</h4>
          <h5 class="mt-0 mb-1">{{recipe.instruction}}</h5>
          {{recipe.peopleCount}}
          <br />
          <small>{{recipe.veg}}</small>
        </div>
        </li>
        </div> -->
    <v-layout row wrap>
      <v-flex xs12 sm12 md4 v-for="recipe in recipes" :key="recipe.id">
        <v-card>
          <v-responsive>
            <v-img :src="getImgUrl(recipe)" height="300px" v-bind:alt="recipe">
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
                        <div class="title">{{recipe.name}}</div>
                        <div class="subheading">Ingredients</div>
                        <ul>
                          <li v-for="(ingredient, i) in ingredients[0]" :key="i">{{ingredient}} </li>
                        </ul>
                        <div class="subheading">Serves {{recipe.peopleCount}}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn icon @click="show = !show">
                <!-- <v-btn icon @click="show = !show"> -->
                  <v-icon>{{ show  ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                 <!-- <div v-show="showRecipeIngredient == recipe.id"> -->
                <div v-show="show">
                  <v-card-text>
                      <div class="subheading">Method</div>
                      <div class="media-body">{{recipe.instructions}}</div>
                      <div> created on {{recipe.dateTime}}</div>
                      <v-card-actions>
                      <div class="close"><v-btn outline block dark color="blue" @click="deleteRecipe(recipe.id)">Delete</v-btn></div>
                      <!-- <div class="close"><v-btn outline block dark color="blue" @click="updateRecipe(recipe)">Update</v-btn></div> -->
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
    tempClick: true,
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
    getIngredient: function (index) {
      console.log('ingredients[index]', this.ingredients[index])
      return this.ingredients[index]
    },
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
    splitter (recipes) {
      let ingredientArr = []
      recipes.forEach(function (obj) {
        let string = obj['ingredients']
        ingredientArr.push(string.split([', ']))
      })
      console.log('ingredientArr', ingredientArr)
      this.ingredients = ingredientArr
    },
    addRecipeCard () {
      this.$emit('clickData', this.tempClick)
      this.tempClick = false
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
