<template>
  <div class="min-h-[80vh] flex justify-center items-center ">
    <UCard class="ring-0 shadow-none w-full mx-14 p-10 bg-white dark:bg-gray-900">
      <div class="w-full h-full flex gap-2 flex-col flex-nowrap justify-center align-middle items-center ">
        <UIcon name="i-heroicons-inbox-arrow-down" class="w-20 h-20 dark:text-white" />
        <h1 class="w-full text-2xl text-center mb-5 ">{{ $t('register_process.check_inbox') }}</h1>
        <h2 class="w-full max-w-2xl text-md text-center mb-0 ">{{ $t('register_process.email_sent') }} <span
            class="text-cyan-500 dark:text-cyan-700" v-text="user?.email"></span> </h2>
        <h3 v-if="canResendEmail" class="w-full max-w-2xl text-sm text-center">{{ $t('register_process.email_not_found')
          }}
          <UButton variant="link" color="cyan" class="lowercase text-sm p-0 pl-1" v-on:click="resendEmail">
            {{ $t('register_process.email_resend') }}
          </UButton>
        </h3>
        <h3 v-else class="w-full max-w-2xl text-sm text-center inline-block">
          {{ $t('register_process.email_can_resent') }}
          <CountDownComponent :format="'mm:ss'" :initialSeconds="remainingSeconds" @finish="activateResendEmail" />
        </h3>
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import CountDownComponent from '~/src/shared/components/CountDownComponent.vue';
import type { UserInterface } from '~/src/shared/interfaces/UserInterface';
import { useToastComposable } from '~/src/shared/composables/ToastComposable';
import { useDateComposable } from '~/src/shared/composables/DateComposable';
import { useAppConfig } from '#app';
import type { GeneralSettingsInterface } from '~/src/modules/auth/register/interfaces/GeneralSettingsInterface';
import { HTTP_CODES_RESPONSE } from '~/src/shared/constants/HTTP_CODES_RESPONSE';
const { showInfoToast, showErrorToast, removeToast } = useToastComposable()

const { t } = useI18n()
const generalConfigApp = (useAppConfig().general_settings ?? {}) as GeneralSettingsInterface;

const configSecondsForResend: number = generalConfigApp.seconds_resend_email ?? 120;
const { DateFormats, getUTCDateTime, getDiferenceInSeconds } = useDateComposable();

const client = useSanctumClient();

const { refreshIdentity } = useSanctumAuth();
const remainingSeconds = ref(0);
/* TODO[epic=test-basic]: 
FIXED by Ivan, This cookie should end the time valid, 
the test must consist in if the time is ended and the server is offline, 
or the client is offline, the time should end their value and restart in 120, its cookie only must save the 
current time when the remaining time is valid, maybe we can use t oerhe last time updated */

const canResendEmail = useCookie<boolean>('canResendEmail');

const lastResend = useCookie<string>('lastStartSecondsForResend');
lastResend.value = lastResend.value || getUTCDateTime(DateFormats.DATE_TIME);

const minutesCounted = getDiferenceInSeconds(lastResend.value, getUTCDateTime(DateFormats.DATE_TIME))

const currentRemaining = configSecondsForResend - minutesCounted;

if (currentRemaining > configSecondsForResend) {
  canResendEmail.value = true;
  remainingSeconds.value = configSecondsForResend;
} else {
  remainingSeconds.value = currentRemaining;
}

canResendEmail.value ??= true;

const user = useSanctumUser<UserInterface>();

function activateResendEmail() {
  canResendEmail.value = true;
}

async function resendEmail() {
  lastResend.value = getUTCDateTime(DateFormats.DATE_TIME);
  remainingSeconds.value = configSecondsForResend;
  canResendEmail.value = false;

  showInfoToast({ id: 'sending:email', title: t('register_process.email_sending') });
  const { data: response_status, status } = await useAsyncData('resendEmail', async () => {
    const response = await client.raw('api/auth/email/verification-notification', {
      method: 'POST',
    });

    return response.status;

  });


  removeToast('sending:email')

  if (status.value === 'success') {
    if (response_status.value === HTTP_CODES_RESPONSE.EMAIL_ALREADY_VALIDATED) {
      
      await refreshIdentity();
      showInfoToast({ id: 'success:email_already_validated', title: t('register_process.email_already_verified') });
      
      return navigateTo('/', { replace: true });

    } else if (response_status.value == 200) {

      showInfoToast({ id: 'success:email_sended', title: t('register_process.email_sent_success') });

    }
  }
  if (status.value === 'error') {
    canResendEmail.value = true;
    showErrorToast({ id: 'error:email_sended', title: t('register_process.email_not_sent') });
  }
}

</script>

<style></style>