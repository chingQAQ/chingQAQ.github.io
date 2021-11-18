<script lang="ts" setup>
  import { defineProps, toRefs } from 'vue';

  interface CardListData {
    [name: string]: string;
  }

  interface Props {
    data: CardListData
    grid?: Array<any>;
  }

  const props = defineProps<Props>();
  const { data, grid } = toRefs(props);
  const convertColumnsToLayout = (x: any) => x.value.map((y: any) => `col-${y.breakpoint}-${Math.floor(y.max / y.span)}`);
  const girdPattern = convertColumnsToLayout(grid);
  const setSrcSet = (url: string) => `${url}.png, ${url}@2x.png 2x, ${url}@3x.png 3x`;

</script>

<template>
  <li
    :class="girdPattern"
    class="card-list__item"
  >
    <component
      :is="data.url ? 'a' : 'div'"
      :href="data.url || ''"
      target="_blank"
      class="card-list__link"
    >
      <div class="card-list__container">
        <div class="card-list__media">
          <picture>
            <source :srcset="setSrcSet(data.image)">
            <img
              lazy="true"
              class="card-list__media-picture"
              :alt="data.name"
            >
          </picture>
        </div>
        <div class="card-list__presentation">
          <h3 class="headline-3" :class="{ 'headline--blank': data.url }">{{ data.name }}</h3>
          <p class="text-16" style="color: #4d4d4d;">{{ data.description }}</p>
        </div>
      </div>
    </component>
  </li>
</template>

<style lang="scss" scoped>
  .card-list {
    &__item {
      transition-duration: 0.3s;
      transition-property: transform;
      @include space(margin, bottom, 30px);
      @media (pointer: fine) and ($breakpoint-md) {
        &:hover {
          transform: matrix(1, 0, 0, 1, -10, -10);

          > .card-list__link {
            box-shadow: 15px 15px 0 0 rgba(#c0c0c0, 1);
          }

          .card-list__presentation {
            @include space(padding, x, 20px, 40px);

            &::before {
              height: 100%;
            }

            &::after {
              width: 100%;
            }
          }
        }
      }
    }

    &__link {
      display: block;
      box-shadow: 0 0 0 0 rgba(#000, 0);
      transition-duration: 0.2s;
      transition-property: box-shadow;
    }

    &__container {
      overflow: hidden;
    }

    &__media {
      aspect-ratio: 1/0.75;
      line-height: 0;
      @include size(100%, auto);
      @supports not(aspect-ratio: auto) {
        position: relative;
        height: 0;
        @include space(padding, top, math.div(0.75, 1) * 100%);
      }

      &-picture {
        object-fit: cover;
        object-position: center;
        @include size(100%);
        @supports not(aspect-ratio: auto) {
          position: absolute;
          height: auto;
        }
      }
    }

    &__presentation {
      position: relative;
      background: #fbfbfb;
      transition-duration: 0.3s;
      transition-property: padding;
      @include space(padding, all, 10px 20px 30px 0);

      &::before,
      &::after {
        position: absolute;
        content: '';
      }

      &::before {
        top: 0;
        left: 0;
        background: linear-gradient(0.5turn, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.45) 100%);
        transition-duration: 0.4s;
        transition-property: height;
        @include size(1px, 0);
      }

      &::after {
        right: 0;
        bottom: 0;
        background: linear-gradient(0.75turn, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.45) 100%);
        transition-duration: 0.25s;
        transition-property: width;
        @include size(0, 1px);
      }
    }
  }
</style>
