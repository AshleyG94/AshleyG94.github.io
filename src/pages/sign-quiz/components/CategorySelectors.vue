<template>
    <label v-for="section in sections" :key="section.title">
        <input type="checkbox" v-model="selected" :value="section.title">
        {{ section.title }} - {{ section.count }}
    </label>
</template>

<script setup>

defineProps({
    sections: {type: Array, required: true}
});

const selected = defineModel('selected', { default: () => [] });
</script>

<style scoped>
label {
  display: block;
  margin-bottom: 8px;
}
</style>