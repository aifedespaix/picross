<template>
  <div class="p-4 profile">
    <div class="text-center">
      Bonjour {{user.name}}.
    </div>
    <div class="profile-actions m-4">
      <router-link class="m-2 p-2 rounded-full bg-white h-full border flex justify-center items-center" to="/create">
        Créer une grille Picross
      </router-link>
      <button class="button button-revert" @click="logout">
        Se déconnecter
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {authModule} from '@/store/modules/Auth';

  @Component({
    components: {},
  })
  export default class UserProfile extends Vue {
    get user() {
      return authModule.user;
    }

    public logout() {
      authModule.logout();
    }
  }
</script>

<style lang="scss">
  .profile {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;

    &-actions {
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-rows: 4rem;
      grid-gap: 1rem;
      justify-items: center;
    }
  }
</style>
