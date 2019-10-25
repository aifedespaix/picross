<template>
  <div class="flex justify-center">
    <UserProfile v-if="isLogged" />
    <div v-else>Tu n'es pas connecté</div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import UserProfile from '@/user/profile.vue';
  import {authModule} from '@/store/modules/Auth';

  @Component({
    components: {UserProfile},
  })
  export default class Profile extends Vue {
    get isLogged() {
      return authModule.logged;
    }
  }
</script>
