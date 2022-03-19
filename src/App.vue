<template>
  <v-app id="app">
    <v-navigation-drawer
      v-if="drawer"
      class="primary accent-4"
      dark
      permanent
      app
      transition="slide-x-transition"
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary accent-4" dense dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="headline"
        ><v-icon>mdi-virus</v-icon> COVID-2019</v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="country in countries"
            :key="country.id"
            link
            :to="'/country/' + country"
            @click="updateCountry(country)"
          >
            <v-list-item-title>{{ country }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      items: [
        { title: "World summary", icon: "mdi-earth", link: "/" },
        { title: "Countries", icon: "mdi-flag", link: "/countries" },
        { title: "News", icon: "mdi-newspaper", link: "/news" },
      ],

      drawer: false,
    };
  },

  mounted() {
    this.$store.dispatch("updateTopCountries");
  },

  methods: {
    updateCountry(country) {
      this.$store.dispatch("newCountryName", country);
    },
  },

  computed: {
    countries() {
      return this.$store.getters.topCountries;
    },
  },
};
</script>
