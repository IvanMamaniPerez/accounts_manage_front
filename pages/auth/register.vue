<script setup lang="ts">
definePageMeta({
    sanctum: {
        guestOnly: true,
    },
    authorization: false
});

import FormRegister from '~/src/modules/auth/register/components/FormRegister.vue';

</script>
<template>
    <div class="flex justify-center h-full items-center p-5 md:p-10 flex-col gap-4">
        <Logo />
        <FormRegister />
    </div>
</template>