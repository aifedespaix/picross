<template>
  <header :class="[colors.main_bg, colors.main_text]" class="flex items-center justify-between h-20">
    <div class="mx-4">PicrossFdp</div>

    <nav>
      <router-link :to="item.to" class="px-2" v-bind:key="item.id"
                   v-for="item in items">
        {{item.name}}
      </router-link>
    </nav>

    <button @click="toggleConfig" class="flex items-center p-3 rounded-full">
      <svg class="fill-current" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" d="M0 0h24v24H0z" fill="none"/>
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
      </svg>
    </button>
  </header>

</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {AppColors} from '@/app.colors.interface';
  import {Getter} from 'vuex-class';

  interface Item {
    to: string;
    name: string;
  }

  @Component({})
  export default class Menu extends Vue {
    private items!: Item[];
    private openConfig = false;

    @Getter private colors!: AppColors;

    private beforeCreate() {
      this.items = [
        {to: '/', name: 'Picross'} as Item,
        {to: '/about', name: 'À Propos'} as Item,
      ];
    }

    private toggleConfig() {
      this.openConfig = !this.openConfig;
    }

  }
</script>
