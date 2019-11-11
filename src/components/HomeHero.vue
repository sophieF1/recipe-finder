<template>
    <v-container fluid fill-height class="home-hero" style="max-height: 100vh;">
        <v-layout justify-center align-center column pa-5>
            <div class="display-4 font-weight-black black--text text-xs-center">
                Recipe Finder
            </div>
            <div class="display-1 font-weight-bold black--text text-xs-center">
            </div>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'HomeHero'
}
</script>

<style scoped>
.home-hero {
    background: url('http://cdn.cnn.com/cnnnext/dam/assets/190710135245-12-waterfront-restaurants.jpg');
    background-size: cover;
    width: 100%;
    height: 100%;
}
</style>
