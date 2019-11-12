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
                    <v-list-item :key="index">
                        <v-list-item-content>
                            {{ item.title }}
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="`divider-${index}`"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app color="brown darken-4" dark>
            <v-toolbar
                class="hidden-md-and-up"
                @click="drawer = !drawer"
            ></v-toolbar>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-btn
                text
                class="hidden-sm-and-down nav-menu"
                to="/recipes"
                data-cy="menuBtn"
                >Recipes</v-btn
            >
            <v-btn
                text
                class="hidden-sm-and-down nav-menu"
                data-cy="menuBtn"
                @click="openDialog">Create</v-btn
            >
        </v-app-bar>
    </span>
</template>

<script>

export default {
  name: 'HomeNavigation',
  data: () => ({
    tempClick: true,
    drawer: false,
    items: [
      { title: 'Recipes', url: '/' },
      { title: 'Create', url: '/' }
    ]
  }),
  methods: {
    openDialog () {
      this.$emit('clickData', this.tempClick)
      this.tempClick = false
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
