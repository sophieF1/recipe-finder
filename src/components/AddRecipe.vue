<template>
<v-row justify="center" v-if="newRecipe">
    <v-dialog v-model="newRecipe" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">New Recipe</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Name*" v-model="recipe.name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Ingredients*" v-model="recipe.ingredients" type="text" :counter="100" multi-line :rows="2" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Instructions*" v-model="recipe.instructions" type="text" :counter="100" multi-line :rows="2" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="recipe.peopleCount" type="number" label="Serves" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="recipe.veg" type="number" label="Vegatarian? 1 for yes" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addRecipe()">Save</v-btn>
        </v-card-actions>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
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
    },
    close () {
      this.$emit('input', !this.value)
    }
  }
}
</script>
