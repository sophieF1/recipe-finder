<template>
    <span>
        <home-hero></home-hero>
        <home-navigation></home-navigation>
        <recipes @clickData="addRecipeCard"></recipes>
        <add-recipe :newRecipe="childData"></add-recipe>
    </span>
</template>

<script>
import HomeHero from '@/components/HomeHero'
import HomeNavigation from '@/components/HomeNavigation'
import Recipes from '@/components/Recipes'
import AddRecipe from '@/components/AddRecipe'

export default {
  name: 'home',
  components: {
    HomeHero,
    HomeNavigation,
    Recipes,
    AddRecipe
  },
  data: function () {
    return {
      childData: false
    }
  },
  methods: {
    addRecipeCard (variable) {
      this.childData = variable
    }
  }
}
</script>
