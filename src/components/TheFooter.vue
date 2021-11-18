<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Footer',
  });
</script>

<template>
  <footer class="footer">
    <p class="text-16">2021 Aion.Chiu</p>
  </footer>
</template>

<style lang="scss" scoped>
  .footer {
    box-sizing: border-box;
    color: var(--global-footer-color);
    text-align: right;
    @include space(padding, x, var(--global-container-boundary-size));
    @include space(padding, y, 20px);
  }
</style>
