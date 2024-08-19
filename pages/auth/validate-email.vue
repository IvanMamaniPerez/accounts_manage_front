<template>
  <ValidateOrResendEmailVerification />
</template>

<script lang="ts" setup>
import ValidateOrResendEmailVerification from '~/src/modules/auth/register/components/ValidateOrResendEmailVerification.vue';

definePageMeta({
  authorization: {
    validateRoles: false
  }
})
</script>

<style></style>