<template>
  <section class="not-found">
    <p class="code">404</p>
    <h1>Page not found.</h1>
    <p>This URL does not match any route in the portfolio/blog app.</p>
    <RouterLink to="/">Return home</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found {
  border: 1px solid #dddddd;
  padding: 2rem;
  text-align: center;
}

.code {
  color: #666666;
  font-size: 4rem;
  font-weight: bold;
  line-height: 1;
}

h1 {
  color: #222222;
  font-size: 2rem;
  margin-bottom: 0.8rem;
}

p {
  color: #444444;
  margin-bottom: 1.5rem;
}

a {
  border: 1px solid #333333;
  background: #333333;
  color: #ffffff;
  display: inline-block;
  font-weight: bold;
  padding: 0.65rem 1rem;
  text-decoration: none;
}
</style>
