<template>
  <div class="min-h-[80vh] flex flex-col px-10 justify-center">
    <h1 class="text-3xl md:text-3xl text-center w-full mb-10">{{ $t('hello', { name: user?.name }) + ' ' +
      $t('what_you_want_to_do') }}</h1>
    <div
      class="grid gap-5 gap-x-10 w-full justify-center grid-cols-1 md:grid-cols-2 justify-items-center max-w-3xl mx-auto">
      <template v-for="activity in activitiesData">
        <UButton color="secondary" v-on:click="sendActivity(activity.slug)"
          class="dark:ring-none w-60 p-0 lg:w-96 bg-white hover:bg-blue-200 dark:hover:bg-gray-800">
          <UCard
            class="h-full text-white  hover:bg-blue-200 dark:bg-gray-700 shadow-none dark:text-black ring-0  dark:hover:bg-gray-800">
            <UIcon :name="activity.icon" class="w-20 h-20 text-black dark:text-white" />
            <h1 class="text-xl text-black dark:text-white">{{ activity.name }}</h1>
            <p class="text-black dark:text-white">{{ activity.description }}</p>
          </UCard>
        </UButton>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import type { UserInterface } from '~/src/shared/interfaces/UserInterface';
import { useAppConfig } from '#app';
import type { AuthorizationConfig } from '../interfaces/AuthorizationInterfaces';
import { getNextStepByStatusRegister } from '../utils/validations';
import { ConfigToast } from '~/src/shared/utils/ToastContigurations';
import { getConfigToast } from '~/src/shared/utils/ToastContigurations';

const authorizationConfig = (useAppConfig().authorization ?? {}) as AuthorizationConfig;
const { refreshIdentity } = useSanctumAuth();
const { t } = useI18n()
const toast = useToast();
const client = useSanctumClient();
const user = useSanctumUser<UserInterface>();

const activitiesData = computed(() => [
  {
    slug: 'client',
    name: t('buy'),
    description: t('buy_description'),
    icon: 'i-heroicons-shopping-cart',
  },
  {
    slug: 'seller',
    name: t('sell'),
    description: t('sell_description'),
    icon: 'i-heroicons-building-storefront',
  }
])

const configLoader = getConfigToast(ConfigToast.loader, {
  id: 'register:activity',
  title: t('updating'),
});

const configError = getConfigToast(ConfigToast.error, {
  id: 'register:activity:error',
  title: t('oops'),
});

async function sendActivity(activity: string) {

  toast.add(configLoader);

  const { data: data, status } = await useAsyncData('register:activity', async () => {
    const response = client('/api/register/activity', {
      method: 'PUT',
      body: JSON.stringify({ slug: activity }),
    })
    return response
  })

  toast.remove(configLoader.id);

  if (status.value === 'success') {

    await refreshIdentity();

    const userUpdated = useSanctumUser<UserInterface>();
    if (!userUpdated.value) {
      return navigateTo('/auth/login');
    }

    const nextStep = getNextStepByStatusRegister(userUpdated.value.status_register, authorizationConfig);

    return navigateTo(nextStep);
  } else if (status.value === 'error') {
    toast.add(configError);
    // TODO[epic=monitoring]: Add monitoring for this error send to backend for monitoring, 
    // proably a interceptor global when the errors are catched
  }
}
</script>

<style></style>