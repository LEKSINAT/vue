<template>
  <section class="hero">
    <p class="eyebrow">Vue Router Practice</p>
    <h1>Welcome to my mini Portfolio/Blog.</h1>
    <p class="intro">
      This single-page app uses Vue Router for smooth navigation, active links,
      dynamic project pages, and a friendly 404 route.
    </p>

    <div class="actions">
      <RouterLink class="primary-button" to="/projects">View Projects</RouterLink>
      <RouterLink class="secondary-button" to="/about">About Me</RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.hero {
  border: 1px solid #dddddd;
  padding: 1.5rem;
}

.eyebrow {
  color: #666666;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

h1 {
  color: #222222;
  font-size: 2.3rem;
  margin-bottom: 1rem;
}

.intro {
  color: #444444;
  font-size: 1rem;
  max-width: 680px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.primary-button,
.secondary-button {
  border: 1px solid #333333;
  font-weight: bold;
  padding: 0.65rem 1rem;
  text-decoration: none;
}

.primary-button {
  background: #333333;
  color: #ffffff;
}

.secondary-button {
  color: #333333;
}
</style>
