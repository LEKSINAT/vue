<template>
  <div class="finance-tracker">
    <header class="tracker-header">
      <h1>Finance Tracker</h1>
      <p>Track incomes, expenses, and your budget in one place.</p>
    </header>

    <section class="tracker-controls">
      <form @submit.prevent="addTransaction">
        <div class="field-row">
          <label>Description</label>
          <input v-model="newDescription" type="text" placeholder="e.g. Groceries" required />
        </div>

        <div class="field-row">
          <label>Amount</label>
          <input v-model.number="newAmount" type="number" step="0.01" placeholder="0.00" required />
        </div>

        <div class="field-row">
          <label>Type</label>
          <select v-model="newType">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div class="budget-row">
          <label>Budget Limit</label>
          <input v-model.number="budgetLimit" type="number" min="0" step="1" />
        </div>

        <button type="submit" class="primary-btn">Add Transaction</button>
          <div class="filter-row">
        <label>Filter</label>
        <select v-model="filterType">
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      </form>

    
    </section>

    <section class="summary-panel">
      
      <div class="summary-card">
        <span>Total Income</span>
        <strong>{{ formattedCurrency(totalIncome) }}</strong>
      </div>
      <div class="summary-card">
        <span>Total Expenses</span>
        <strong>{{ formattedCurrency(totalExpenses) }}</strong>
      </div>
      <div class="summary-card">
        <span>Balance</span>
        <strong :class="{ negative: balance < 0 }">{{ formattedCurrency(balance) }}</strong>
      </div>
      <div class="summary-card">
        <span>Budget Status</span>
        <strong>{{ budgetStatus }}</strong>
      </div>
    </section>

    <section class="transactions-section">
      <h2>Transactions</h2>
      <div v-if="filteredTransactions.length === 0" class="empty-state">
        No transactions yet. Add one above to begin.
      </div>
      <ul class="transaction-list">
        <li v-for="transaction in filteredTransactions" :key="transaction.id" :class="transaction.type">
          <div>
            <p class="desc">{{ transaction.desc }}</p>
            <p class="meta">{{ transaction.type }} • {{ transaction.date }}</p>
          </div>
          <div class="amount-row">
            <span>{{ formattedCurrency(transaction.amount) }}</span>
            <button @click="deleteTransaction(transaction.id)" aria-label="Delete transaction">×</button>
          </div>
        </li>
      </ul>
      <button @click="clearAll" class="secondary-btn" :disabled="transactions.length === 0">Clear All</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

type TransactionType = 'income' | 'expense'

type Transaction = {
  id: number
  desc: string
  amount: number
  type: TransactionType
  date: string
}

const STORAGE_KEY = 'finance-tracker-transactions'

const transactions = ref<Transaction[]>([])
const filterType = ref<'all' | TransactionType>('all')
const budgetLimit = ref(1000)
const newDescription = ref('')
const newAmount = ref<number | null>(null)
const newType = ref<TransactionType>('income')

const loadTransactions = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      transactions.value = JSON.parse(saved)
    } catch {
      transactions.value = []
    }
  }
}

const saveTransactions = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions.value))
}

const filteredTransactions = computed(() => {
  if (filterType.value === 'all') {
    return transactions.value
  }
  return transactions.value.filter((tx) => tx.type === filterType.value)
})
 

const totalIncome = computed(() => {
  return transactions.value
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)
})

const totalExpenses = computed(() => {
  return transactions.value
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)
})

const balance = computed(() => totalIncome.value - totalExpenses.value)

const isOverBudget = computed(() => totalExpenses.value > budgetLimit.value)

const expensePercentage = computed(() => {
  if (budgetLimit.value <= 0) return 0
  return Math.min(100, Math.round((totalExpenses.value / budgetLimit.value) * 100))
})

const budgetStatus = computed(() => {
  if (isOverBudget.value) {
    return `Over budget by ${formattedCurrency(totalExpenses.value - budgetLimit.value)}`
  }
  return `${expensePercentage.value}% of budget used`
})

const addTransaction = () => {
  if (!newDescription.value || !newAmount.value) return

  transactions.value.unshift({
    id: Date.now(),
    desc: newDescription.value.trim(),
    amount: newAmount.value,
    type: newType.value,
    date: new Date().toLocaleDateString(),
  })

  newDescription.value = ''
  newAmount.value = null
  newType.value = 'income'
}

const deleteTransaction = (id: number) => {
  transactions.value = transactions.value.filter((tx) => tx.id !== id)
}

const clearAll = () => {
  transactions.value = []
}

const formattedCurrency = (value: number) => {
  return value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })
}

watch(transactions, saveTransactions, { deep: true })
watch(balance, (newBalance) => {
  if (newBalance < 0) {
    console.warn('Balance is negative. Review your expenses.')
  }
})

onMounted(loadTransactions)
</script>

<style scoped>
.finance-tracker {
  /* max-width: 1100px; */
  margin: 0 auto;
  padding: 18px;
  border-radius: 14px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
}

.tracker-header {
  padding: 8px 8px 14px;
}

.tracker-header h1 {
  margin: 0 0 6px;
  font-size: 28px;
  color: var(--color-heading);
}

.tracker-header p {
  margin: 0;
  color: var(--color-text);
  opacity: 0.8;
}

.tracker-controls {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 14px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.35);
  border: 1px solid var(--color-border);
}

/* Form */
.tracker-controls form {
  display: grid;
  gap: 12px;
}

.field-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  align-items: center;
  gap: 10px;
}

.field-row label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  opacity: 0.85;
}

.field-row input,
.field-row select {
  width: 100%;
  height: 38px;
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-background);
  color: inherit;
}

.field-row input:focus,
.field-row select:focus {
  outline: none;
  border-color: var(--color-border-hover);
  box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.15);
}

.primary-btn,
.secondary-btn {
  justify-self: start;
  height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 700;
  transition: transform 0.05s ease, background-color 0.15s ease, border-color 0.15s ease;
}

.primary-btn {
  background: hsla(160, 100%, 37%, 1);
  color: white;
}

.primary-btn:hover {
  background: hsla(160, 100%, 37%, 0.92);
}

.primary-btn:active {
  transform: translateY(1px);
}

.secondary-btn {
  background: transparent;
  border-color: var(--color-border);
  color: var(--color-text);
}

.secondary-btn:hover:not(:disabled) {
  border-color: var(--color-border-hover);
  background: rgba(44, 62, 80, 0.06);
}

.secondary-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* Side controls (budget/filter) */
.budget-row,
.filter-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  /* align-items: center; */
  gap: 5px;
  padding: 6px 0;
}

.budget-row label,
.filter-row label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  opacity: 0.85;
}

.budget-row input {
  width: 100%;
  height: 38px;
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-background);
  color: inherit;
}

/* Summary */
.summary-panel {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.summary-card {
  padding: 14px;
  border-radius: 14px;
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.35);
}

.summary-card span {
  display: block;
  color: var(--color-text);
  opacity: 0.75;
  font-size: 13px;
  margin-bottom: 6px;
}

.summary-card strong {
  font-size: 18px;
}

.summary-card strong.negative {
  color: #ef4444;
}

/* Transactions */
.transactions-section {
  margin-top: 14px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.35);
}

.transactions-section h2 {
  margin: 0 0 10px;
  font-size: 18px;
  color: var(--color-heading);
}

.empty-state {
  padding: 14px;
  border-radius: 12px;
  border: 1px dashed var(--color-border);
  color: var(--color-text);
  opacity: 0.75;
  background: rgba(44, 62, 80, 0.04);
}

.transaction-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.transaction-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
}

.transaction-list li.income {
  border-color: rgba(34, 197, 94, 0.35);
}

.transaction-list li.expense {
  border-color: rgba(239, 68, 68, 0.35);
}

.desc {
  margin: 0;
  font-weight: 700;
  color: var(--color-heading);
}

.meta {
  margin: 4px 0 0;
  font-size: 12px;
  color: var(--color-text);
  opacity: 0.65;
}

.amount-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.amount-row span {
  font-weight: 800;
}

.transaction-list li.expense .amount-row span {
  color: #ef4444;
}

.transaction-list li.income .amount-row span {
  color: #22c55e;
}

.amount-row button {
  width: 28px;
  height: 28px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.amount-row button:hover {
  border-color: var(--color-border-hover);
  background: rgba(44, 62, 80, 0.06);
}

.amount-row button:active {
  transform: translateY(1px);
}

.transactions-section > .secondary-btn {
  margin-top: 12px;
}

@media (max-width: 900px) {
  .tracker-controls {
    grid-template-columns: 1fr;
  }

  .summary-panel {
    grid-template-columns: repeat(2, 1fr);
  }

  .field-row,
  .budget-row,
  .filter-row {
    grid-template-columns: 120px 1fr;
  }
}

@media (max-width: 560px) {
  .field-row,
  .budget-row,
  .filter-row {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .summary-panel {
    grid-template-columns: 1fr;
  }

  .transaction-list li {
    align-items: flex-start;
  }

  .amount-row {
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>

