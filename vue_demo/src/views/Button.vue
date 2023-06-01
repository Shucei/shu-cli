<template>
  <div class="Button">
    <h1 class="Button">Button</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, ref } from "vue";
  const message = ref("Hello World");
</script>

<style scoped></style>
