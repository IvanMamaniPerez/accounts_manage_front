<template>
  <div>
    <h1>Esta es la secure zone</h1>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['sanctum:auth'],
})
</script>

<style>

</style>