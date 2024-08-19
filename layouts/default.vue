<template>
  <div class="bg-white dark:bg-gray-900">
    <AppHeader />
    <slot />
    <NotificationComponent />
  </div>
</template>

<script lang="ts" setup>
import NotificationComponent from '~/src/shared/components/NotificationComponent.vue';


</script>

<style>
#__nuxt,
#__nuxt>div {
  min-height: 100vh;
}

</style>