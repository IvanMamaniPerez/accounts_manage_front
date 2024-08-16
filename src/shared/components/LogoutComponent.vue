<template>
  <div>
    <UButton color="secondary" v-on:click="logoutUser">{{ $t('logout') }}</UButton>
  </div>
</template>

<script lang="ts" setup>
  const { logout } = useSanctumAuth();
  async function logoutUser() {
    await logout();
    navigateTo('/auth/login');
  }
</script>

<style>

</style>