<template>
  <Teleport to="body">
    <modal :show="filmDetailId != 0" @close="$emit('close')">
      <template #header>
        <h3>Filmi detailid</h3>
      </template>
      <template #body>
        <b>Nimi: </b>{{ currentFilm.filmName }}<br />
        <b>Žanr: </b>{{ currentFilm.genre }}<br />
        <b>Kirjeldus: </b>{{ currentFilm.description }}<br />
        <b>Avalikustamine: </b>{{ currentFilm.releaseDate }}<br />
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
        id: 0,
        filmName: '',
        genre: '',
        description: '',
        releaseDate: ''
      }
    };
  },
  beforeUpdate() {
    if (this.filmDetailId === 0) return;
    this.getDetails()
  },
  props: {
    filmDetailId:{
      type: Number,
      required: true,
    }
  },
  methods: {
    async getDetails() {
      this.currentFilm = await (await fetch(`http://localhost:8090/films/${this.filmDetailId}`)).json()
    }
  }
})
</script>

<style>
.modal-container {
  width: 700px;
}
</style>
