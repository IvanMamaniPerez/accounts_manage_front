<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n(); 

const setLocale = (lang: string) => {
  locale.value = lang;
}
const isSelected = (lang: string) => computed(() => locale.value === lang);
</script>

<template>
    <UButtonGroup>
      <UButton label="ES" color="primary" :disabled="isSelected('es').value" v-on:click="setLocale('es')" />
      <UButton label="EN" color="primary" :disabled="isSelected('en').value" v-on:click="setLocale('en')" />
  </UButtonGroup>
</template>
<style>

</style>