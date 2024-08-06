<template>
  <UFormGroup label="Email" name="email">
    <UInput v-model="state.model" />
  </UFormGroup>
</template>

<script lang="ts" setup>
const state = {
  model: ''
}
const model = defineModel()

</script>

<style></style>