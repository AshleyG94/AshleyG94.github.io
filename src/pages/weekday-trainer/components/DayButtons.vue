<template>
    <div class="button-row">
    <button
        v-for="day in days"
        :key="day.value"
        class="day-btn"
        @click="$emit('guess', day.value)"
    >
    {{ day.label}}
    </button>
    </div>
</template>

<script setup>
defineEmits(["guess"]);

const days = [
  { label: "Mon", value: 0 },
  { label: "Tue", value: 1 },
  { label: "Wed", value: 2 },
  { label: "Thu", value: 3 },
  { label: "Fri", value: 4 },
  { label: "Sat", value: 5 },
  { label: "Sun", value: 6 },
];
</script>

<style scoped>
.button-row {
  display: flex;

  justify-content: center;

  gap: 28px;

  flex-wrap: wrap;

  padding: 0 16px 24px;
}

.day-btn {
  appearance: button;
  width: 90px;

  background-color: #1899d6;

  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;

  box-sizing: border-box;

  color: #ffffff;

  cursor: pointer;

  display: inline-block;

  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.8px;
  line-height: 20px;

  margin: 0;

  outline: none;

  overflow: visible;

  padding: 13px 19px;

  position: relative;

  text-align: center;
  text-transform: uppercase;

  touch-action: manipulation;

  transform: translateZ(0);

  transition: filter 0.2s;

  user-select: none;
  -webkit-user-select: none;

  vertical-align: middle;

  white-space: nowrap;
}

.day-btn::after {
  background-clip: padding-box;

  background-color: #1cb0f6;

  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;

  bottom: -4px;

  content: "";

  left: 0;

  position: absolute;

  right: 0;

  top: 0;

  z-index: -1;
}

.day-btn:hover:not(:disabled) {
  filter: brightness(1.1);
}

.day-btn:disabled {
  cursor: auto;
}

.day-btn:active::after {
  border-width: 0 0 0px;
}

.day-btn:active {
  padding-bottom: 10px;
}


</style>

