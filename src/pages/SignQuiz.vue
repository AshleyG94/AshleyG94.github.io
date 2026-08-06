<template>
  <main class="page">
    <div v-if="gameState === 'menu'">
      <CategorySelectors
      :sections="sections"
      v-model:selected="selectedSections"> 
      </CategorySelectors>
      <button v-if="questionPool.length >= 10" @click="startGame">
        Start Game
      </button>
    </div>
    <div v-if="gameState === 'playing'">
      <VideoContainer :key="currentQuestion.id" :videos="currentQuestion.videos" />
      <AnswerButtons
        :options="currentQuestion.options"
        :selected-answer="selectedAnswer"
        :correct-answer="formatOption(currentQuestion)"
        @guess="handleGuess"
      />
      <p v-if="selectedAnswer">
        {{ selectedAnswer === formatOption(currentQuestion) ? "Correct!" : "Incorrect — the answer was " + formatOption(currentQuestion) }}
      </p>
      <button v-if="selectedAnswer" @click="nextQuestion">
        Next question
      </button>
    </div>
    <div v-if="gameState === 'results'">
      <button @click="startGame">
        GO AGAIN
      </button>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import VideoContainer from "./sign-quiz/components/Video.vue";
import CategorySelectors from "./sign-quiz/components/CategorySelectors.vue";
import AnswerButtons from "./sign-quiz/components/AnswerButtons.vue";
import vocabData from "./sign-quiz/gcse-vocabulary.json";

const gameState = ref("menu");
const selectedSections = ref([])
const sections = vocabData.sections.map(s =>({title: s.title, count: s.words.length }));
const questionPool = computed(() =>
  vocabData.sections.filter(s => selectedSections.value.includes(s.title)).flatMap(s => s.words)
);

const roundQuestions = ref([]); 
const currentIndex = ref(0);
const score = ref(0);
const selectedAnswer = ref(null);
const currentQuestion = computed(() => roundQuestions.value[currentIndex.value]);

function shuffleQuestions(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
function formatOption(w) {
  return `${w.label} - ${w.gloss}`;
}

function buildOptions(word) {
  const distractors = shuffleQuestions( 
    questionPool.value.filter(w => w.id !== word.id)
  ).slice(0,3).map(formatOption);
  return shuffleQuestions([formatOption(word), ...distractors]);
}

function startGame() {
  const picked = shuffleQuestions(questionPool.value).slice(0,10);
  roundQuestions.value = picked.map(word => ({...word,
  options: buildOptions(word),
  }))
  currentIndex.value = 0;
  score.value = 0;
  selectedAnswer.value = null;
  gameState.value="playing";
}

function handleGuess(option){
  selectedAnswer.value = option;
  if ( option === formatOption(currentQuestion.value) )
  {
    score.value++
  }
}

function nextQuestion() {
  if (currentIndex.value + 1 >= roundQuestions.value.length) {
    gameState.value = "results";
    return;
  }
  currentIndex.value++;
  selectedAnswer.value = null;
}


</script>

<style scoped>
.page {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: calc(var(--header-height) * -2);
}
</style>
