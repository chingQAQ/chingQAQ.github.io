<script lang="ts" setup>
  import { inject, defineProps, toRefs } from 'vue';
  import type { State } from '@/store';

  interface Title {
    title?: string
  }

  const props = defineProps<Title>();
  const { title } = toRefs(props);
  const state = inject('state') as State;
</script>

<template>
  <section class="aion-block">
    <div class="container">
      <h2 class="headline-2">{{ title }}</h2>
      <div class="row content">
        <div class="col-sm-4 col-md-7 order-sm-2 order-md-1 content__vertical">
          <slot name="mainContent">
            <p v-if="state.store.about.presentation" class="text-24">
              {{ state.store.about.presentation.description }}
            </p>
          </slot>
        </div>
        <div class="col-sm-4 col-md-5 order-sm-1 order-md-2 content__right">
          <slot name="rightContent"></slot>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  /** @define utilities */
  :slotted(.content__gap) {
    @include space(margin, top, 40px);
  }

  :slotted(.content__photo) {
    object-position: center;
    object-fit: cover;
    @include size(100%);
  }

  :slotted(.hero) {
    width: 100%;
    aspect-ratio: 1/1;
    @supports not(aspect-ratio: auto) {
      position: relative;
      height: 0;
      line-height: 0;
      @include space(padding, top, 100%);
    }

    picture {
      @supports not(aspect-ratio: auto) {
        position: absolute;
        top: 0;
        left: 0;
      }

      img {
        object-position: center;
        object-fit: cover;
        @include size(100%);
      }
    }
  }

  .content {
    white-space: break-spaces;

    &__vertical {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &__right {
      @include space(margin, top, 0);
      @include breakpoint($breakpoint-sm) {
        @include space(margin, bottom, calc(var(--global-container-distance-size-sm) / 3));
      }
    }
  }

</style>
