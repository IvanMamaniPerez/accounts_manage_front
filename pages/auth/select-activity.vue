<script lang="ts" setup>
    definePageMeta({
        authorization: {
            validateRoles:false
        }
    })
import SelectActivityComponent from '~/src/modules/auth/register/components/SelectActivityComponent.vue';
</script>
<template>
  <SelectActivityComponent />
</template>
<style>
</style>