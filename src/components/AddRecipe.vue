<template >
  <v-container grid-list-lg v-if="newRecipe">
  <v-layout row wrap>
      <v-flex xs12 sm12 md4>
        <v-card>
          <v-responsive>
            <v-img :src="require('@/assets/base.jpg')" height="300px" v-bind:alt="recipe">
             <v-container fill-height fluid>
              <v-layout fill-height>
              </v-layout>
            </v-container>
            </v-img>
          </v-responsive>
               <v-card-text>
                        <v-form
                          ref="form"
                          v-model="valid"
                          :lazy-validation="lazy"
                        >
                        <v-text-field
                          v-model="recipe.name"
                          :counter="10"
                          label="Name"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="recipe.ingredients"
                          :counter="100"
                          label="Ingredients"
                          multi-line
                          :rows="2"
                          required
                        ></v-text-field>
                         <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="recipe.peopleCount"
                          type="number"
                          label="Serves"
                          required
                        ></v-text-field></v-col>
                         <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="recipe.veg"
                          type="number"
                          label="Vegatarian? 1 for yes"
                          required
                        ></v-text-field> </v-col>
                        <v-text-field
                          v-model="recipe.instructions"
                          type="text"
                          :counter="100"
                          multi-line
                          :rows="2"
                          label="Instructions"
                          required
                        ></v-text-field>
                         <v-card-actions>
                        <div class="close"><v-btn outline block dark color="blue" @click="addRecipe()">Save</v-btn></div>
                      </v-card-actions>
                   </v-form>
              </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const API_URL = 'http://localhost:4080/recipes'

export default {
  name: 'AddRecipe',
  props: {
    newRecipe: {
      type: Boolean
    }
  },
  data: () => ({
    newRecipe: false,
    error: '',
    recipes: [],
    recipe: {
      name: '',
      img: 'base.jpg',
      peopleCount: 0,
      ingredients: '',
      veg: 0,
      instructions: ''
    }
  }),
  watch: {
    newRecipe: function () {
      this.newRecipe = true
    }
  },
  methods: {
    addRecipe () {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.recipe),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => response.text())
        .then(result => {
          if (result.details) {
            const error = result.details
              .map(detail => detail.message)
              .join('. ')
            this.error = error
          } else {
            this.recipes.push(result)
            this.$router.go()
          }
        })
    },
    reset () {
      this.$refs.form.reset()
    },
    validateField () {
      this.$refs.form.validate()
    }
  }
}
</script>
