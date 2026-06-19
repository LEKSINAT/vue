<template>
  <section v-if="project" class="detail-card">
    <RouterLink class="back-link" to="/projects">← Back to projects</RouterLink>
    <p class="eyebrow">Project #{{ project.id }}</p>
    <h1>{{ project.title }}</h1>
    <p class="summary">{{ project.summary }}</p>
    <p>{{ project.description }}</p>

    <ul class="tool-list" aria-label="Project tools">
      <li v-for="tool in project.tools" :key="tool">{{ tool }}</li>
    </ul>
  </section>

  <section v-else class="detail-card">
    <p class="eyebrow">Missing Project</p>
    <h1>That project does not exist.</h1>
    <p>Try opening one of the project cards from the projects page.</p>
    <RouterLink class="primary-button" to="/projects">Go to projects</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { projects } from '../data/projects'

const route = useRoute()

const project = computed(() => {
  const projectId = Number(route.params.id)

  return projects.find((item) => item.id === projectId)
})
</script>

<style scoped>
.detail-card {
  border: 1px solid #dddddd;
  padding: 1.5rem;
}

.back-link {
  color: #0000ee;
  display: inline-block;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.eyebrow {
  color: #666666;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

h1 {
  color: #222222;
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  color: #444444;
  font-size: 1rem;
  margin-bottom: 1rem;
  max-width: 760px;
}

.summary {
  color: #333333;
  font-weight: bold;
}

.tool-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  list-style: none;
  margin-top: 1.5rem;
  padding: 0;
}

.tool-list li {
  border: 1px solid #cccccc;
  color: #333333;
  padding: 0.4rem 0.7rem;
}

.primary-button {
  border: 1px solid #333333;
  background: #333333;
  color: #ffffff;
  display: inline-block;
  font-weight: bold;
  margin-top: 0.8rem;
  padding: 0.65rem 1rem;
  text-decoration: none;
}
</style>
