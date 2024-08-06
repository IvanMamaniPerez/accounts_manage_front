<script setup lang="ts">
import FormLogin from '~/src/auth/login/components/FormLogin.vue';
import Logo from '~/components/Logo.vue';
</script>
<template>
    <div class="flex justify-center items-center p-10 h-[80vh] flex-col gap-4">
        <Logo />
        <FormLogin />
    </div>
</template>