<script setup lang="ts">
import LanguageSelectorComponent from '~/src/shared/components/LanguageSelectorComponent.vue';
import ColorModeComponent from '~/src/shared/components/ColorModeComponent.vue';
import LogoutComponent from '~/src/shared/components/LogoutComponent.vue';

const { isAuthenticated } = useSanctumAuth();
</script>

<template>
  <header class="w-full dark:bg-transparent px-4">
    <div class="flex justify-end items-center py-4 gap-4">
        <ColorModeComponent />
        <LanguageSelectorComponent />
        <LogoutComponent v-if="isAuthenticated" />
    </div>
  </header>
</template>
