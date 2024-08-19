<template>
  <div class="min-h-[80vh] flex flex-col px-10 justify-center">
    <h1 class="text-3xl md:text-3xl text-center w-full mb-10">
      {{ $t('register_process.email_we_are_verifying') }}</h1>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  authorization: false,
});
import { useToastComposable } from '~/src/shared/composables/ToastComposable';
const route = useRoute()
const { showErrorToast , showSuccessToast} = useToastComposable()
const client = useSanctumClient();
const { t } = useI18n()
const { refreshIdentity } = useSanctumAuth();
if (!route.params) {
  console.log('No params');
  navigateTo('/auth/login');
}

interface ConfirmEmail {
  user_id: string;
  hash: string;
}

const params = route.params as ConfirmEmail;
//const validateEmail = async () => {
const queryString = new URLSearchParams(route.query as Record<string, string>).toString();
console.log('user_id', params.user_id);
console.log('hash', params.hash);
console.log('queryString', queryString);
const { data: data, status } = await useAsyncData('auth:confirm-email', async () => {
  const response = client(`api/auth/email/verification/${params.user_id}/${params.hash}?${queryString}`)

  console.log('response', response);
  return response
})

if (status.value === 'success') {
  showSuccessToast({ id: 'success:validation', title: t('register_process.email_verifed_success') });
  await refreshIdentity();
  navigateTo('/', { replace: true });
  
} else {
  showErrorToast({ id: 'error:validation', title: t('opps') });
}



</script>

<style></style>