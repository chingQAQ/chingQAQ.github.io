<script lang="ts">
  import { defineComponent, provide } from 'vue';
  import TheHeader from '@/components/TheHeader.vue';
  import TheFooter from '@/components/TheFooter.vue';
  import { state, getUserRepositories, init } from '@/store';

  export default defineComponent({
    name: 'App',
    components: {
      TheHeader,
      TheFooter
    },
    setup() {
      provide('state', state);
      init(getUserRepositories('/api/en.json'));

      return { state };
    }
  });
</script>

<template>
  <the-header></the-header>
  <main>
    <router-view></router-view>
  </main>
  <the-footer></the-footer>
</template>
