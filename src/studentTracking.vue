<script setup>
import { ref, computed } from 'vue'

const studentName = ref('')
const scores      = ref([])
const passMark    = ref(50)

const average = computed(() => {
  if (!scores.value.length) return 0
  const sum = scores.value.reduce((a, b) => a + b, 0)
  return +(sum / scores.value.length).toFixed(1)
})

const highest  = computed(() => scores.value.length ? Math.max(...scores.value) : 0)
const lowest   = computed(() => scores.value.length ? Math.min(...scores.value) : 0)

const grade = computed(() => {
  const a = average.value
  if (a >= 90) return 'A'
  if (a >= 80) return 'B'
  if (a >= 70) return 'C'
  if (a >= 60) return 'D'
  return 'F'
})

const isPassing = computed(() => average.value >= passMark.value)

const summary = computed(
  () => `${studentName.value} | Avg: ${average.value} | Grade: ${grade.value} | ${isPassing.value ? 'PASSING' : 'FAILING'}`
)

// Helper to add a score from the input
const newScore = ref('')
function addScore() {
  const val = parseFloat(newScore.value)
  if (!isNaN(val) && val >= 0 && val <= 100) {
    scores.value.push(val)
    newScore.value = ''
  }
}

function removeScore(index) {
  scores.value.splice(index, 1)
}
</script>

<template>
  <div style="padding: 2rem; font-family: sans-serif; max-width: 500px;">
    <h2>Student Grade Calculator</h2>

    <div>
      <label>Student Name: </label>
      <input v-model="studentName" placeholder="Enter name" />
    </div>

    <div style="margin-top: 1rem;">
      <label>Pass Mark: </label>
      <input v-model.number="passMark" type="number" min="0" max="100" />
    </div>

    <div style="margin-top: 1rem;">
      <label>Add Score: </label>
      <input v-model.number="newScore" type="number" min="0" max="100" @keyup.enter="addScore" />
      <button @click="addScore">Add</button>
    </div>

    <div style="margin-top: 1rem;">
      <strong>Scores:</strong>
      <span v-if="scores.length === 0"> None yet</span>
      <span
        v-for="(score, i) in scores"
        :key="i"
        style="margin-left: 6px; background: #eee; padding: 2px 8px; border-radius: 4px; cursor: pointer;"
        @click="removeScore(i)"
        title="Click to remove"
      >{{ score }} ×</span>
    </div>

    <hr style="margin: 1.5rem 0;" />

    <p><strong>Average:</strong> {{ average }}</p>
    <p><strong>Highest:</strong> {{ highest }}</p>
    <p><strong>Lowest:</strong>  {{ lowest }}</p>
    <p><strong>Grade:</strong>   {{ grade }}</p>
    <p><strong>Passing:</strong> {{ isPassing }}</p>
    <p><strong>Summary:</strong> {{ summary }}</p>
  </div>
</template>