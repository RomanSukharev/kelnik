<script setup lang="ts">
const isVisible = ref(false);

const handleScroll = () => {
  isVisible.value = window.scrollY > 400;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <button 
    v-if="isVisible" 
    type="button" 
    class="scroll-top__button" 
    @click="scrollToTop"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="15"
      viewBox="0 0 10 15"
      fill="none"
    >
      <path
        d="M4.99998 14.0032L4.99998 2.00317M4.99998 2.00317L9.00061 6.00317M4.99998 2.00317L0.99935 6.00317"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  </button>
</template>

<style lang="scss">
.scroll-top__button {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #98D2A3;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}
</style>
