<template>
  <div class="min-h-[80vh] flex flex-col gap-10 px-10 xl:px-70 justify-center">
    <h1 class="text-3xl md:text-5xl text-center w-full">{{ $t('what_you_want_to_do') }}</h1>
    <div class="grid gap-8 w-full justify-center grid-cols-1 md:grid-cols-2 justify-items-center">
      <template v-for="activity in activitiesData">
        <UButton color="primary" v-on:click="sendActivity(activity.slug)" class="dark:ring-none w-60 lg:w-96 hover:bg-white">
          <UCard class="bg-slate-600 text-white dark:bg-white dark:text-black dark:border-none ring-none dark:ring-none w-full">
            <UIcon :name="activity.icon" class="w-20 h-20" />
            <h1 class="text-xl">{{ activity.name }}</h1>
            <p>{{ activity.description }}</p>
          </UCard>
        </UButton>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const activitiesData = [
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
]

const sendActivity = (activity: string) => {
  console.log(activity)
}
</script>

<style></style>