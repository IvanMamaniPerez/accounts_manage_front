<script setup lang="ts">
import { RolesEnum } from '~/src/shared/enums/RolesEnum';
import { useToastComposable } from '~/src/shared/composables/ToastComposable';
const { showLoaderToast, showErrorToast, removeToast, showSuccessToast } = useToastComposable()

definePageMeta({
    authorization: {
        roles: [RolesEnum.seller]
    }
})
</script>

<template>
<h2>Dashboard Seller</h2>
<UButton @click="showSuccessToast({ id: 'seller:dashboard', title: 'exito en la operacion' })">Show Toast</UButton>
</template>