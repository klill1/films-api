<template>
  <Teleport to="body">
    <modal :show="filmDetailId != 0" @close="$emit('close')">
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
</template>
<script>
import Modal from './Modal.vue'

export default({
  components: {
    Modal,
  },
  emits: ['close'],
  data() {
    return {
      currentFilm: {
        id: 5,
        filmName: 'asdf',
        genre: 'ah',
        description: 'sfh',
        releaseDate: 'sd'
      }
    }
  },
  beforeUpdate() {
    if (this.filmDetailId === 0) return;
    this.getDetails()
  },
  props: {
    filmDetailId: Number,
    required: true
  },
  methods: {
    async getDetails() {
      this.currentFilm = await (await fetch(`http://localhost:8090/films/${this.filmDetailId}`)).json()
    }
  }
})
</script>
