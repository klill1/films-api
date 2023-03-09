<template>
    <Teleport to="body">
    <modal :show="filmDetailId != 0" @close="$emit('close')">
      <template #header>
        <h3>Filmi detailid</h3>
      </template>
      <template #body>
        <b>Nimi: </b> {{ currentFilm.filmName }} <br />
        <b>Kirjeldus: </b> {{ currentFilm.description }} <br />
        <b>Avalikustamine: </b> {{ currentFilm.releaseDate }} <br />
      </template>
    </modal>
  </Teleport>
</template>

<script>
import Modal from './Modal.vue'
export default {
    components: {
        Modal,
    },
    props: {
        filmDetailId: {
            type: Number,
            required: true,
        },
    },
    data(){
        return {
            currentFilm: {
                id: 0, 
                filmName: "", 
                description: "", 
                releaseDate: "",
            },
        },
    },
    beforeUpdate() {
        this.getDetails();
    },
    methods: {
        async getDetails() {
            this.currentFilm = await (
                await fetch(`http://localhost:8090/films/${this.filmDetailId}`)
            ).json();
        }
    },
};
</script>

<style>
</style>