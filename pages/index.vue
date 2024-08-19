<template>
  <div>
    <h1>Estoy en el indice, si estoy autenticado debo ser redirigido a la ruta segun el tipo de usuario</h1>
    <NuxtLink to="/secure">Ir a la zona segura</NuxtLink>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  authorization: {
    validateRoles: false,
  },
  middleware: ["redirect-home"]
});
</script>

<style></style>