<template>
  <div class="flex justify-end items-center"
       :class="theme.hints">
    <div :class="[hint.valid ? theme.hint_valid : '', hintStyle]"
         v-for="hint in hintsModel.hints">
      {{hint.value}}
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import HintsModel from '@/components/Picross/Hints/Hints.model';
  import {Theme} from '@/components/Theme/theme';
  import {Getter} from 'vuex-class';
  import {settingsModule} from '@/store/modules/Settings';

  @Component
  export default class Hints extends Vue {

    @Prop() private hintsModel!: HintsModel;

    get theme() {
      return settingsModule.theme;
    }

    private hintStyle = [
      'flex',
      'justify-center',
      'items-center',
      'w-4',
      'h-4',
    ];

  }
</script>
