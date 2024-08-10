<script setup lang="ts">
import LanguageSelectorComponent from '~/src/shared/components/LanguageSelectorComponent.vue';
import ColorModeComponent from '~/src/shared/components/ColorModeComponent.vue';
</script>

<template>
  <header class="w-full dark:bg-gray-600 px-4">
    <div class="flex justify-end items-center py-4 gap-4">
        <ColorModeComponent />
        <LanguageSelectorComponent />
    </div>
  </header>
</template>
