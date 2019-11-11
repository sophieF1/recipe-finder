<template>
    <span>
        <v-navigation-drawer
            app
            v-model="drawer"
            class="brown lighten-2"
            dark
            disable-resize-watcher
        >
            <v-list>
                <template v-for="(item, index) in items">
                    <v-list-item :key="index" :to="item.url">
                        <v-list-item-content>
                            {{ item.title }}
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="`divider-${index}`"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app color="brown darken-4" dark>
            <v-toolbar-side-icon
                class="hidden-md-and-up"
                @click="drawer = !drawer"
            ></v-toolbar-side-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link to="/">
                <v-toolbar-title data-cy="titleBtn">{{
                    appTitle
                }}</v-toolbar-title>
            </router-link>
            <v-btn
                flat
                class="hidden-sm-and-down nav-menu"
                to="/recipes"
                data-cy="menuBtn"
                >Recipes</v-btn
            >
            <v-btn
                flat
                class="hidden-sm-and-down nav-menu"
                to="/recipes"
                data-cy="menuBtn"
                >Create</v-btn
            >
        </v-app-bar>
    </span>
</template>

<script>
export default {
  name: 'HomeNavigation',
  data () {
    return {
      drawer: false,
      items: [
        { title: 'Recipes', url: '/recipes' },
        { title: 'Create', url: '/recipes' }
      ]
    }
  }
}
</script>

<style scoped>
a {
    color: white;
    text-decoration: none;
}
</style>
