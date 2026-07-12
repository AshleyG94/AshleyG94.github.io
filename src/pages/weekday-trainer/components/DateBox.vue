<template>
    <div class="date-box">
        <div class="date-text">
            <span class="date-label">DATE</span>
            <span>to guess day of the week</span>
        </div>

    <div class="big-date">
        {{dateText}}
    </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
defineProps({
    dateText: {type: String, required: true}
});
</script>

<style scoped>
.date-box {
  border: 3px solid #111;
  padding: 28px;
  width: min(860px, 92vw);
  margin: 40px auto 60px;
  text-align: center;
}

.date-text {
  font-size: 18px;
  margin-bottom: 18px;
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: baseline;
}

.date-label {
  letter-spacing: 1px;
}

.big-date {
  font-size: 28px;
  border: 2px solid #111;
  padding: 14px 16px;
  display: inline-block;
  min-width: 220px;
}

</style>