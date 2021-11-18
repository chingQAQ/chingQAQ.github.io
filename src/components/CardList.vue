<script lang="ts" setup>
  import { defineProps, withDefaults } from 'vue';
  import CardListItem from '@/components/CardListItem.vue';
  import type { DataType } from '@/store';

  interface Grid {
    breakpoint: string;
    max: number;
    span: number;
  }

  interface Props {
    data: DataType<string>
    grid?: Array<Grid>
  }

  withDefaults(defineProps<Props>(), {
    grid: () => ([
      {
        breakpoint: 'sm',
        max: 4,
        span: 1
      }
    ])
  });

</script>

<template>
  <section class="aion-block">
    <div class="container">
      <h2 class="headline-2">Portfolio</h2>
      <ul class="row card-list">
        <card-list-item
          v-for="( item, tid ) in data"
          :key="tid"
          :data="item"
          :grid="grid"
        ></card-list-item>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
  .card-list {
    line-height: 0;
    @include space(margin, top, 24px);
  }
</style>
