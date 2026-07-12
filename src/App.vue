<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="site-header">
    <RouterLink to="/" class="site-title">Home</RouterLink>
  </header>

  <main class=site-main>
    <RouterView />
  </main>
</template>

<style scoped>
.site-header {
  height: var(--header-height);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e4e7;
  text-align: left;
  position: relative;
  z-index: 1;
}

.site-title {
  font-weight: 600;
  text-decoration: none;
  color: inherit;
}

.site-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
