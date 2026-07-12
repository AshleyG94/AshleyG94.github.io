<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="home">
    <h1>Ashley Gilliver</h1>
    <p>Welcome. Here's what's around:</p>

    <ul class="project-list">
      <li>
        <RouterLink to="/weekday-trainer">Weekday Trainer</RouterLink>
        &mdash; practice figuring out the day of the week for any date.
      </li>
    </ul>
  </div>

  <!--
  <div class="hampk">
  <RouterLink to="/memorial">
    <img src="
  -->
</template>

<style scoped>
.home {
  max-width: 640px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align:center;
}

.project-list {
  padding-left: 20px;
}
</style>
