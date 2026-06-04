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

const gradeColor = computed(() => {
  const a = average.value
  if (a >= 90) return '#22c55e'
  if (a >= 80) return '#3b82f6'
  if (a >= 70) return '#f59e0b'
  if (a >= 60) return '#f97316'
  return '#ef4444'
})

const isPassing = computed(() => average.value >= passMark.value)

const summary = computed(
  () => `${studentName.value || 'Student'} | Avg: ${average.value} | Grade: ${grade.value} | ${isPassing.value ? 'PASSING' : 'FAILING'}`
)

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

const progressWidth = computed(() => `${average.value}%`)
</script>

<template>
  <div class="wrapper">
    <div class="card">
      <!-- Header -->
      <div class="card-header">
        <!-- <div class="header-icon">🎓</div> -->
        <div>
          <h1 class="title">Grade Calculator</h1>
          <p class="subtitle">Track student performance</p>
        </div>
      </div>

      <!-- Inputs -->
      <div class="fields">
        <div class="field">
          <label class="label">Student Name</label>
          <input class="input" v-model="studentName" placeholder="Enter student name" />
        </div>

        <div class="field">
          <label class="label">Pass Mark</label>
          <input class="input input--short" v-model.number="passMark" type="number" min="0" max="100" />
        </div>

        <div class="field">
          <label class="label">Add Score</label>
          <div class="score-input-row">
            <input
              class="input input--short"
              v-model.number="newScore"
              type="number"
              min="0"
              max="100"
              placeholder="0–100"
              @keyup.enter="addScore"
            />
            <button class="btn-add" @click="addScore">+ Add</button>
          </div>
        </div>
      </div>

      <!-- Score Tags -->
      <div class="scores-section">
        <span class="label">Scores</span>
        <div class="score-tags">
          <span v-if="scores.length === 0" class="empty-label">None yet — add a score above</span>
          <span
            v-for="(score, i) in scores"
            :key="i"
            class="tag"
            @click="removeScore(i)"
            title="Click to remove"
          >
            {{ score }} <span class="tag-remove">×</span>
          </span>
        </div>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Average</span>
          <span class="stat-value">{{ average }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Highest</span>
          <span class="stat-value stat-value--high">{{ highest }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Lowest</span>
          <span class="stat-value stat-value--low">{{ lowest }}</span>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="progress-section">
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" :style="{ width: progressWidth, background: gradeColor }"></div>
          <div class="progress-pass-mark" :style="{ left: passMark + '%' }"></div>
        </div>
        <div class="progress-labels">
          <span style="font-size:11px; color:#94a3b8;">0</span>
          <span style="font-size:11px; color:#94a3b8;">Pass: {{ passMark }}</span>
          <span style="font-size:11px; color:#94a3b8;">100</span>
        </div>
      </div>

      <!-- Grade Badge -->
      <div class="grade-row">
        <div class="grade-badge" :style="{ borderColor: gradeColor, color: gradeColor }">
          {{ grade }}
        </div>
        <div class="pass-badge" :class="isPassing ? 'pass-badge--pass' : 'pass-badge--fail'">
          {{ isPassing ? '✓ PASSING' : '✗ FAILING' }}
        </div>
      </div>

      <!-- Summary -->
      <div class="summary-box">
        <span class="summary-label">Summary</span>
        <p class="summary-text">{{ summary }}</p>
      </div>
    </div>
  </div>
</template>



<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial, sans-serif;
}

/* .wrapper{
  min-width: 200%;
  min-height:100%;
  background:#f3f3f3;
  padding:40px;
} */

.card{
 min-width: 200%;
 min-height: 50%;
  margin:auto;
  background:white;
  padding:25px;
  border:1px solid #ddd;
  margin-bottom: 0;
}

/* Header */
.card-header{
  margin-bottom:25px;
}

.title{
  font-size:42px;
  color:#222;
  font-weight:bold;
}

.subtitle{
  /* margin-top:5px; */
  color:#666;
  font-size:14px;
}

/* Fields */
.fields{
  display:grid;
  grid-template-columns:1fr 1fr 1fr;
  gap:20px;
  margin-bottom:25px;
}

.field{
  display:flex;
  flex-direction:column;
}

.label{
  /* margin-bottom:8px; */
  font-size:14px;
  font-weight:bold;
  color:#333;
}

.input{
  /* height:30px; */
  padding:10px;
  border:1px solid #ccc;
  font-size:14px;
}

.input:focus{
  outline:none;
  border-color:#0099cc;
}

.score-input-row{
  display:flex;
  gap:10px;
}

.input--short{
  width:100%;
}

.btn-add{
  background:#00b5e2;
  color:white;
  border:none;
  padding:0 20px;
  cursor:pointer;
  font-size:14px;
}

.btn-add:hover{
  background:#0095bb;
}

/* Scores */
.scores-section{
  margin-bottom:25px;
}

.score-tags{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top:10px;
}

.tag{
  background:#eaf7fc;
  color:#0077aa;
  padding:8px 14px;
  border-radius:3px;
  cursor:pointer;
  border:1px solid #cde8f3;
}

.tag-remove{
  margin-left:5px;
}

.empty-label{
  color:#888;
  font-size:14px;
}

/* Divider */
.divider{
  border-top:1px solid #ddd;
  /* margin:25px 0; */
}

/* Stats */
.stats-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  margin-bottom:25px;
}

.stat-card{
  border:1px solid #ddd;
  padding:10px;
  text-align:center;
  background:#fafafa;
}

.stat-label{
  display:block;
  margin-bottom:10px;
  color:#555;
  font-size:14px;
}

.stat-value{
  font-size:32px;
  font-weight:bold;
  color:#222;
}

.stat-value--high{
  color:green;
}

.stat-value--low{
  color:red;
}

/* Progress */
.progress-section{
  margin-bottom:25px;
}

.progress-bar-bg{
  height:12px;
  background:#ddd;
  position:relative;
}

.progress-bar-fill{
  height:100%;
  transition:0.3s;
}

.progress-pass-mark{
  position:absolute;
  top:-3px;
  width:2px;
  height:18px;
  background:black;
}

.progress-labels{
  display:flex;
  justify-content:space-between;
  margin-top:8px;
  font-size:13px;
  color:#666;
}

/* Grade */
.grade-row{
  display:flex;
  align-items:center;
  gap:15px;
  margin-bottom:25px;
}

.grade-badge{
  width:50px;
  height:50px;
  border-radius:50%;
  border:4px solid;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:28px;
  font-weight:bold;
}

.pass-badge{
  padding:12px 18px;
  font-weight:bold;
  font-size:14px;
}

.pass-badge--pass{
  background:#e8f8ee;
  color:green;
  border:1px solid #b7e4c7;
}

.pass-badge--fail{
  background:#fdecec;
  color:red;
  border:1px solid #f5bcbc;
}

/* Summary */
.summary-box{
  border:1px solid #ddd;
  padding:20px;
  background:#fafafa;
}

.summary-label{
  display:block;
  margin-bottom:10px;
  font-weight:bold;
  color:#444;
}

.summary-text{
  color:#666;
  line-height:1.6;
}

</style>