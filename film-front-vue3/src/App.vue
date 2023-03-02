<template>
  <div>
    <table-template
      v-if="films"
      caption="Kõik filmid"
      :items="films"
      :showControls="true"
      @show="($event) => (filmDetailId = $event)"
    >
      
    </table-template>
    <Teleport to="body">
      <modal :show="filmDetailId != 0" @close="filmDetailId = 0">
        <template #header>
          <h3>Filmi detailid</h3>
        </template>
        <template #body>
          <b>Name: </b>{{ currentFilm.filmName }}<br />
          <b>genre: </b>{{ currentFilm.genre }}<br />
          <b>description: </b>{{ currentFilm.description }}<br />
          <b>releaseDate: </b>{{ currentFilm.releaseDate }}<br />
        </template>
      </modal>
    </Teleport>
  </div>
</template>

<script>
import Modal from './components/icons/Modal.vue'
import TableTemplate from './components/TableTemplate.vue'
export default {
  components: {
    Modal,
    TableTemplate
  },
  data() {
    return {
      msg: 'Hello World!',
      films: [],
      showModal: false,
      filmDetailId: 0,
      currentFilm: {
        id: 5,
        filmName: 'asdf',
        genre: 'ah',
        description: 'sfh',
        releaseDate: 'sd'
      }
    }
  },
  async created() {
    this.films = await (await fetch('http://localhost:8090/films')).json()
  },
  watch: {
    async filmDetailId(newId) {
      if (newId == 0) return;
      this.currentFilm = await (await fetch(`http://localhost:8090/films/${newId}`)).json()
    }
  }
}
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
