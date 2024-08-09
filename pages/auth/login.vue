<script setup lang="ts">
import FormLogin from '~/src/modules/auth/login/components/FormLogin.vue';
import Logo from '~/components/Logo.vue';
</script>
<template>
    <div class="flex justify-center items-center p-5 md:p-10 flex-col gap-4">
        <Logo />
        <FormLogin />
    </div>
</template>