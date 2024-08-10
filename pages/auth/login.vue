<script setup lang="ts">
import FormLogin from '~/src/modules/auth/login/components/FormLogin.vue';
definePageMeta({
    authorization: false,
});
</script>
<template>
    <div class="flex justify-center items-center p-5 md:p-10 flex-col gap-4">
        <Logo />
        <FormLogin />
    </div>
</template>