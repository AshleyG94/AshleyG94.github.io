<template>
  <main class="page">
    <div v-if="gameState === 'menu'">
      <h1>Day Of A Date Trainer</h1>

      <button @click="startGame">
        Play
      </button>
    </div>
    <div v-else-if="gameState === 'playing'">
    <h2>
      Question {{ currentQuestion }}
      /
      {{ totalQuestions }}
    </h2>
      <DateBox
        :dateText="displayDate"
      />
      <DayButtons
        @guess="handleGuess"
      />
    </div>
    <div v-else-if="gameState === 'results'">
    <h2>Results</h2>
    <p>
      Score:
      {{ correctAnswers }}
      /
      {{ totalQuestions }}
    </p>

    <p v-if="correctAnswers === totalQuestions">
      Average Time:
      {{(averageTime / 1000).toFixed(2)}} s
    </p>
    <p v-else>
      Sorry! You can only score if you get 10 out of 10!
    </p>
    <p v-if="bestEverTime !== null">
      Your best time ever is: {{ (bestEverTime / 1000).toFixed(2) }} s
    </p>
    <p v-if="bestEverTime === averageTime">
      Congrats on your new record!
    </p>

    <table class="breakdown">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Answer</th>
          <th>Guess</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(entry, index) in guessHistory"
          :key="index"
          :class="entry.correct ? 'row-correct' : 'row-wrong'"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ entry.dateText }}</td>
          <td>{{ dayNames[entry.actual] }}</td>
          <td>{{ entry.correct ? "✓" : dayNames[entry.guessed] }}</td>
          <td>{{ (entry.ms / 1000).toFixed(2) }} s</td>
        </tr>
      </tbody>
    </table>

    <button @click="startGame">
      Play Again
    </button>
    </div>

  </main>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";

import DateBox from "./weekday-trainer/components/DateBox.vue";
import DayButtons from "./weekday-trainer/components/DayButtons.vue";

const selectedDate = ref("");
const gameState = ref("menu");
const currentQuestion = ref(1);
const totalQuestions = 10;
const correctAnswers = ref(0);
const questionStartTime = ref(0);
const guessHistory = ref([]);
const bestEverTime = ref(null);
const BEST_TIME_KEY = "BEST_TIME";

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];


onMounted(() => {
  const stored = localStorage.getItem(BEST_TIME_KEY);
  if (stored !== null) {
    bestEverTime.value = Number(stored);
  }
});

function startGame() {
  gameState.value="playing";
  currentQuestion.value = 1;
  correctAnswers.value = 0;
  guessHistory.value = [];
  newRandomDate();
}


function handleGuess(day) {
  const responseTime = Date.now() - questionStartTime.value;
  const correct = day === actualDay.value;

  guessHistory.value.push({
    dateText: displayDate.value,
    guessed: day,
    actual: actualDay.value,
    ms: responseTime,
    correct: correct,
  });

  if ( correct )
  {
    correctAnswers.value++;
  }
  else
  {
    gameState.value = "results";
    return;
  }
  if ( currentQuestion.value >= totalQuestions )
  {
    gameState.value = "results";
    if ( correctAnswers.value === totalQuestions && (bestEverTime.value === null || averageTime.value < bestEverTime.value)){
      bestEverTime.value = averageTime.value;
      localStorage.setItem(BEST_TIME_KEY, String(bestEverTime.value));
    }

    return;
  }

  currentQuestion.value++;
  newRandomDate();
}

function randomDate2026() {
  const start = new Date("2026-01-01T00:00:00");
  const end = new Date("2026-12-31T00:00:00");

  const startMs = start.getTime();
  const endMs = end.getTime();

  const randomMs =
    startMs +
    Math.floor(Math.random() * (endMs - startMs));

  const randomDate = new Date(randomMs);

  // Format as YYYY-MM-DD
  const yyyy = randomDate.getFullYear();

  const mm = String(
    randomDate.getMonth() + 1
  ).padStart(2, "0");

  const dd = String(
    randomDate.getDate()
  ).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

function newRandomDate() {
  selectedDate.value = randomDate2026();
  questionStartTime.value = Date.now();
}

// -----------------------------
// Convert JS day numbering
// -----------------------------
//
// JS:
// 0 = Sunday
// 1 = Monday
//
// We want:
// 0 = Monday
// 6 = Sunday
//

function getMonFirstDayIndex(dateString) {
  const d = new Date(dateString + "T00:00:00");

  const jsDay = d.getDay();

  return (jsDay + 6) % 7;
}

// Actual weekday
const actualDay = computed(() => {
  return getMonFirstDayIndex(
    selectedDate.value
  );
});

function ordinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

// Human-readable form of selectedDate, e.g. "June 5th"
const displayDate = computed(() => {
  if (!selectedDate.value) {
    return "";
  }
  const d = new Date(selectedDate.value + "T00:00:00");
  const month = d.toLocaleString("en-US", { month: "long" });
  const day = d.getDate();
  return `${month} ${day}${ordinalSuffix(day)}`;
});

const averageTime = computed(() => {
  if (guessHistory.value.length === 0){
    return 0;
  }
  const total = guessHistory.value.reduce(
    (sum, entry) => sum + entry.ms,
    0
  );

  return Math.round(total / guessHistory.value.length)
});


</script>

<style scoped>
.page {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: calc(var(--header-height) * -2);
}

.breakdown {
  margin: 1rem auto;
  border-collapse: collapse;
}

.breakdown th,
.breakdown td {
  padding: 0.25rem 0.75rem;
  border-bottom: 1px solid #ccc;
}

.row-wrong {
  color: #c0392b;
}
</style>
