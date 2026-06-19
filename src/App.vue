
<template>
  <header class="site-header">
    <RouterLink class="brand" to="/">Sinat Portfolio</RouterLink>

    <nav class="nav-links" aria-label="Main navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/projects">Projects</RouterLink>
    </nav>
  </header>

  <main class="page-shell">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid #dddddd;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
}

.brand {
  color: #222222;
  font-size: 1.1rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.nav-links a {
  border: 1px solid #cccccc;
  color: #333333;
  padding: 0.45rem 0.75rem;
  text-decoration: none;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  background: #333333;
  color: #ffffff;
}

.page-shell {
  min-height: calc(100vh - 7rem);
}

@media (max-width: 640px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .nav-links {
    width: 100%;
  }

  .nav-links a {
    flex: 1;
    text-align: center;
  }
}
</style>
