<template>
  <div>
    <RouterLink to="/addFilm">Lisa uus film</RouterLink>
    <table-template
      caption="Kõik filmid"
      :items="films"
      :showControls="true"
      @show="filmDetailId = $event.id"
      @delete="filmToDelete = $event">
    </table-template>
  </div>
  <film-details :filmDetailId="filmDetailId" @close="$event => filmDetailId=0"></film-details>
  <modal :show="JSON.stringify(filmToDelete) !== '{}'">
    <template #header>
      <h3>Filmi Kustutamine</h3>
    </template>
    <template #body>
      <p>Oled kindel, et soovid kustutada seda filmi?</p>
    </template>
    <template #footer>
      <button class="modal-default-button" @click="deleteFilm()">Jah</button>
      <button class="modal-default-button" @click="filmToDelete = {}">
        Ei
      </button>
    </template>
  </modal>
</template>

<script>
import FilmDetails from '../../components/FilmDetails.vue'
import TableTemplate from '../../components/TableTemplate.vue'
import Modal from '../../components/Modal.vue';
import {RouterLink} from 'vue-router'
export default {
  components: {
    TableTemplate,
    FilmDetails,
    RouterLink,
    Modal
  },
  data() {
    return {
      films: [],
      filmDetailId: 0,
      filmToDelete: {},
    };
  },
  async created() {
    this.films = await (await fetch('http://localhost:8090/films')).json()
  },
  methods: {
    async deleteFilm() {
      fetch("http://localhost:8090/films/" + this.filmToDelete.id, {
        method: "delete",
      }).then(async (response) => {
        if (response.status == 204) {
          this.films.splice(this.films.indexOf(this.filmToDelete), 1);
          this.filmToDelete = {};
        } else {
          const data = await response.json();
          console.log("DELETE: ", data);
        }
      })
    }
  }
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
