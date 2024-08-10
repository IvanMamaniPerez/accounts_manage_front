<template>
  <div>
    <h1>Verify email</h1>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
    sanctum:{
      guestOnly: true,
    },
    authorization: false
})
</script>

<style>

</style>