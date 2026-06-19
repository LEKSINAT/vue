<template>
  <section class="content-card">
    <p class="eyebrow">About</p>
    <h1>Hi, I’m building my Vue Router skills.</h1>
    <p>
      This page is a normal route. It demonstrates how a portfolio can organize
      information without reloading the browser.
    </p>
    <p>
      The app includes a home page, an about page, a projects list, dynamic
      project detail pages, active navigation links, and a catch-all 404 page.
    </p>
  </section>
</template>

<style scoped>
.content-card {
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
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  color: #444444;
  font-size: 1rem;
  margin-bottom: 1rem;
  max-width: 760px;
}
</style>
