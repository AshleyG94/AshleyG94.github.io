<template>
  <div class="answer-buttons">
    <button
      v-for="option in options"
      :key="option"
      :disabled="selectedAnswer !== null"
      :class="buttonClass(option)"
      @click="$emit('guess', option)"
    >
      {{ option }}
    </button>
  </div>
</template>

<script setup>
const { options, selectedAnswer, correctAnswer } = defineProps({
  options: { type: Array, required: true },
  selectedAnswer: { type: String, default: null },
  correctAnswer: { type: String, required: true },
});

defineEmits(["guess"]);

function buttonClass(option) {
  if (selectedAnswer === null) return {};
  if (option === correctAnswer) return { correct: true };
  if (option === selectedAnswer) return { incorrect: true };
  return {};
}
</script>

<style scoped>
.answer-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: min(600px, 92vw);
  margin: 24px auto;
}

.answer-buttons button {
  padding: 14px 18px;
  font-size: 16px;
  border-radius: 12px;
  border: 2px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  text-align: left;
}

.answer-buttons button:disabled {
  cursor: auto;
}

.answer-buttons button.correct {
  background-color: #58cc02;
  border-color: #58cc02;
  color: #fff;
}

.answer-buttons button.incorrect {
  background-color: #ff4b4b;
  border-color: #ff4b4b;
  color: #fff;
}
</style>
