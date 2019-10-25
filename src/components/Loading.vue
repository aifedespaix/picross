<template>
  <div class="flex justify-center items-center flex-col">
    <img alt="Logo Picross" src="@/assets/icons/picross-icon.svg" class="loader">
    <div class="loadingue">Loadingue</div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Loading extends Vue {

  }
</script>

<style lang="scss">
  .loader {
    @apply w-16 h-16;
    animation: loading 3s ease-in-out infinite;
  }

  .loadingue {
    @apply p-4 font-mono text-xl;
    animation: loadingue 2s ease-in-out infinite;
  }

  @keyframes loadingue {
    15% {
      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
    50% {
      transform: rotateX(0deg) rotateY(180deg) rotateZ(0deg);
    }
    85% {
      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
  }

  @keyframes loading {
    0% {
      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
    25% {
      transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg);
    }
    50% {
      transform: rotateX(180deg) rotateY(0deg) rotateZ(180deg);
    }
    75% {
      transform: rotateX(0deg) rotateY(0deg) rotateZ(180deg);
    }
    100% {
      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
  }
</style>
