<script setup lang="ts">
import ScrollToTop from '~/ui-kits/scroll/ScrollToTop.vue';
</script>

<template>
  <div class="container">
    <slot />

    <ScrollToTop />
  </div>
</template>
