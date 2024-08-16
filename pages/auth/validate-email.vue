<template>
  <div class="min-h-[80vh] flex justify-center items-center ">
    <UCard class="ring-0 shadow-none w-full mx-14 p-10 bg-white dark:bg-gray-900">
      <div class="w-full h-full flex gap-2 flex-col flex-nowrap justify-center align-middle items-center ">
        <UIcon name="i-heroicons-inbox-arrow-down" class="w-20 h-20 dark:text-white" />
        <h1 class="w-full text-2xl text-center mb-5 ">{{ $t('register_process.check_inbox') }}</h1>
        <h2 class="w-full max-w-2xl text-md text-center mb-0 ">{{ $t('register_process.email_sent') }} <span
            class="text-blue-500 dark:text-indigo-500" v-text="user?.email"></span> </h2>
        <h3 v-if="canResendEmail" class="w-full max-w-2xl text-sm text-center">{{ $t('register_process.email_not_found')
          }}
          <UButton variant="link" color="indigo" class="lowercase text-sm p-0 pl-1" v-on:click="resendEmail">
            {{ $t('register_process.email_resend') }}
          </UButton>
        </h3>
        <h3 v-else class="w-full max-w-2xl text-sm text-center inline-block">
          {{ $t('register_process.email_can_resent') }}
          <CountDownComponent :format="'mm:ss'" :initialSeconds="secondsForResend" @remainig_seconds="updateCookie"
            @finish="activateResendEmail" />
        </h3>
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import CountDownComponent from '~/src/shared/components/CountDownComponent.vue';
import type { UserInterface } from '~/src/shared/interfaces/UserInterface';
definePageMeta({
  authorization: {
    validateRoles: false
  }
})
const configSecondsForResend: number = 120;

const toast = useToast();
const client = useSanctumClient();
const secondsForResend = useCookie<number>(
  'secondsForResend'
);
const canResendEmail = useCookie('canResendEmail',
  {
    default: () => true
  });

const user = useSanctumUser<UserInterface>();
secondsForResend.value = secondsForResend.value || configSecondsForResend;
if (secondsForResend.value <= 0) {
  canResendEmail.value = true;
  secondsForResend.value = configSecondsForResend;
}

function activateResendEmail() {
  secondsForResend.value = configSecondsForResend;
  canResendEmail.value = true;
}

async function resendEmail() {
  secondsForResend.value = configSecondsForResend;
  console.log('resendEmail', canResendEmail.value, secondsForResend.value)
  canResendEmail.value = false;

  const { data: data, status } = await useAsyncData('resendEmail', async () => {
    return await client('api/fortify/email/verification-notification', {
      method: 'POST'
    });
  });

  console.log(data, status)

}

function updateCookie(payload: { seconds: number }) {
  secondsForResend.value = payload.seconds;
}
</script>

<style></style>