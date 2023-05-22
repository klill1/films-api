<template>
    <div>
        <RouterLink to="/addUser">Lisa uus kasutaja</RouterLink>
        <table-template
            caption="Kõik kasutajad"
            :items="users"
            :showControls="true"
            @show="userDetailId = $event.id"
            @delete="userToDelete = $event"
        >
        </table-template>
    </div>
    <user-details
        :userDetailId="userDetailId"
        @close="userDetailId = 0"
    ></user-details>
    <modal :show="JSON.stringify(userToDelete) !== '{}'">
    <template #header>
      <h3>Kasutaja kustutamine</h3>
    </template>
    <template #body>
      <p>Oled kindel, et soovid kustutada seda kasutajat?</p>
    </template>
    <template #footer>
      <button class="modal-default-button" @click="deleteUser()">Jah</button>
      <button class="modal-default-button" @click="userToDelete = {}">
        Ei
      </button>
    </template>
  </modal>
</template>

<script>
import TableTemplate from '../../components/TableTemplate.vue';
import UserDetails from '../../components/UserDetails.vue';
import Modal from '../../components/Modal.vue';
import { RouterLink } from 'vue-router';
export default {
    components: {
        TableTemplate,
        UserDetails,
        RouterLink,
        Modal,
    },
    data() {
        return {
            users: [],
            userDetailId: 0,
            userToDelete: {},
        };
    },
    async created() {
        this.users = await (await fetch("http://localhost:8090/users")).json();
    },
    methods: {
        async deleteUser() {
            fetch("http://localhost:8090/users/" + this.userToDelete.id, {
                method: "delete"
            }).then(async (response) => {
                if (response.status == 204) {
                    this.users.splice(this.users.indexOf(this.userToDelete), 1);
                    this.userToDelete = {};
                } else {
                    const data = await response.json();
                    console.log("Delete: ", data);
                }
            });
        },
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