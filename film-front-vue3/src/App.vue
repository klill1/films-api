<template>
  <div>
    <table-template caption="Kõik filmid" :items="films" :showControls="true" @show="filmDetailId = $event.id">
    </table-template>
  </div>
  <film-details :filmDetailId="filmDetailId" @close="filmDetailId = 0"></film-details>
</template>

<script>
import FilmDetails from './components/FilmDetails.vue'
import TableTemplate from './components/Table.vue'
export default {
  components: {
    Modal,
    TableTemplate,
  },
  data() {
    return {
      films: [],
      filmDetailId: 0,
    }
  },
  async created() {
    this.films = await (await fetch("http://localhost:8090/films")).json();
  }, 
};
</script>

<style scoped>

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
