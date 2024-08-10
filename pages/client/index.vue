<script setup lang="ts">
import { RolesEnum } from '~/src/shared/enums/RolesEnum';
definePageMeta({
    authorization: {
        roles: [RolesEnum.client]
    }
})
</script>

<template>
<h2>DASHBOARD CLIENT</h2>
</template>