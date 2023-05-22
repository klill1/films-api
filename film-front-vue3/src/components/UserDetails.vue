<template>
    <Teleport to="body">
      <modal :show="userDetailId != 0" @close="$emit('close')">
        <template #header>
          <h3>Kasutaja Detailid</h3>
        </template>
        <template #body
          ><b>Nimi: </b>{{ currentUser.userName }}<br />
          <b>Vaadatud filmid: </b>
          <ul>
            <li v-for="filmuser in currentUser.filmUsers" :key="filmuser.id">
              {{ filmuser.film.name }}
            </li>
          </ul>
        </template>
      </modal>
    </Teleport>
</template>
<script>
  import Modal from './Modal.vue';
  export default {
    components: {
      Modal,
    },
    props: {
      userDetailId: {
        type: Number,
        required: true,
      },
    },
    emits: ["close"],
    data() {
      return {
        currentUser: {
          id: 0,
          userName: "",
          filmUsers: [
            {
              id: 0,
              film: {
                id: 0,
                name: "",
              },
            },
          ],
        },
      };
    },
    beforeUpdate() {
      if (this.userDetailId == 0) return;
      this.getDetails();
    },
    methods: {
      async getDetails() {
        this.currentUser = await (
          await fetch(`http://localhost:8090/users/${this.userDetailId}`)
        ).json();
      },
    },
  };
</script>
<style>
  .modal-container {
    width: 700px;
  }
</style>
  