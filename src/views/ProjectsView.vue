<template>
  <section>
    <div class="page-heading">
      <p class="eyebrow">Projects</p>
      <h1>Pick a project to open its dynamic route.</h1>
    </div>

    <div class="project-grid">
      <article v-for="project in projects" :key="project.id" class="project-card">
        <p class="category">{{ project.category }}</p>
        <h2>{{ project.title }}</h2>
        <p>{{ project.summary }}</p>
        <RouterLink :to="`/projects/${project.id}`">Read details</RouterLink>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { projects } from '../data/projects'
</script>

<style scoped>
.page-heading {
  margin-bottom: 1.5rem;
}

.eyebrow {
  color: #666666;
  font-weight: bold;
  margin-bottom: 0.6rem;
  text-transform: uppercase;
}

h1 {
  color: #222222;
  font-size: 2rem;
  max-width: 760px;
}

.project-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.project-card {
  border: 1px solid #dddddd;
  padding: 1rem;
}

.category {
  color: #666666;
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 0.7rem;
  text-transform: uppercase;
}

h2 {
  color: #222222;
  font-size: 1.25rem;
  margin-bottom: 0.8rem;
}

.project-card p:not(.category) {
  color: #444444;
  margin-bottom: 1.2rem;
}

.project-card a {
  color: #0000ee;
  font-weight: bold;
}
</style>
