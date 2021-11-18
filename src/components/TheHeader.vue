<script lang="ts" setup>
  import type { RouteRecordRaw } from 'vue-router';
  import { ref, computed } from 'vue';
  import { routes } from '@/router';

  const nav = routes.reduce((acc, curr: RouteRecordRaw) => {
    let into: number = 0;

    if (/Home/.test(curr.name as string)) {
      into = 0;
    }
    else {
      into = 1;
    }

    (acc[into] as Array<RouteRecordRaw>).push(curr);

    return acc;
  }, [[], []]) as Array<Array<RouteRecordRaw>>;
  const navCount = ref<number>(0);
  const navState = computed(() => navCount.value % 2 === 1);

</script>

<template>
  <header class="header">
    <div class="logo">
      <router-link
        v-for="(item, tid) in nav[0]"
        :key="tid"
        v-slot="{ href, navigate}"
        :to="{path: item.path}"
        custom
      >
        <a
          :href="href"
          class="logo__link"
          @click="navigate"
        >
          <!-- <img src="https://via.placeholder.com/60" alt=""> -->
        </a>
      </router-link>
    </div>
    <button class="navigation-toggle" @click="navCount++">
      <span class="navigation-toggle__line"></span>
      <span class="navigation-toggle__line"></span>
      <span class="navigation-toggle__line"></span>
    </button>
    <nav class="navigation" :class="{'navigation--mb-open': navState}">
      <ul class="navigation__wrapper">
        <li class="navigation__item">
          <a
            href="https://github.com/chingQAQ"
            target="_blank"
            class="navigation__link text-16"
          >
            Github
          </a>
        </li>
        <li class="navigation__item">
          <a
            href=""
            target="_blank"
            class="navigation__link text-16"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>
