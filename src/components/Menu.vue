<template>
    <nav class="flex justify-center mb-4">
      <router-link
              class="p-2 text-blue-500 hover:text-blue-800"
              v-for="item in items" :to="item.to" v-bind:key="item.id">
          {{item.name}}
      </router-link>
    </nav>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  interface Item {
    to: string;
    name: string;
  }

  @Component
  export default class Menu extends Vue {
    private items: any;

    private beforeCreate() {
      this.items = [
        {to: '/', name: 'Picross'} as Item,
        {to: '/about', name: 'À Propos'} as Item,
      ];
    }
  }
</script>
