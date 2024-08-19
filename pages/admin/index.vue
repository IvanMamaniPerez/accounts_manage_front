<script setup lang="ts">
import { RolesEnum } from '~/src/shared/enums/RolesEnum';
definePageMeta({
    authorization: {
        roles: [RolesEnum.admin]
    }
})
</script>

<template>
    <AppHeader />
    <h2>Dahboard ADMIN</h2>
    <AppFooter />
</template>