<script lang="ts" setup>
  import { inject } from 'vue';
  import CardList from '@/components/CardList.vue';
  import AboutContent from '@/components/AboutContent.vue';
  import type { State } from '@/store';
  import { setSrcSet } from '../util';

  const state = inject('state') as State;
</script>

<template>
  <about-content>
    <template #rightContent>
      <div class="hero">
        <picture v-if="state.store.about.presentation">
          <source :srcset="setSrcSet(state.store.about.presentation.photo)">
          <img class="content__photo">
        </picture>
      </div>
    </template>
  </about-content>
  <about-content title="Experience">
    <template #mainContent>
      <ul class="card-list">
        <li
          v-for="(item, tid) in state.store.about.experience"
          :key="tid"
          :class="{ 'content__gap': tid !== 0 }"
        >
          <h3 class="headline-3">{{ item.title }}</h3>
          <a
            :href="item.url"
            target="_blank"
            class="text-company"
          >
            {{ item.company }}
          </a>
          <span class="text-12">{{ item.time }}</span>
          <ul>
            <li
              v-for="(j, jid) in item.achieve"
              :key="jid"
              class="text-16 achieve"
            >
              {{ j }}
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </about-content>
  <card-list
    :data="state.store.portfolio"
    :grid="[
      {
        breakpoint: 'sm',
        max: 4,
        span: 2
      },
      {
        breakpoint: 'md',
        max: 12,
        span: 3
      },
    ]"
  ></card-list>
</template>

<style lang="scss" scoped>
  .achieve {
    position: relative;
    @include space(margin, left, 6px);
    @include space(padding, left, 18px);

    &:not(:last-child) {
      @include space(margin, bottom, 12px);
    }

    &::before {
      position: absolute;
      left: 0;
      top: 10px;
      content: '';
      background-color: var(--global-primary-color);
      @include size(6px, 2px);
    }
  }
</style>
