<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { useI18n } from 'vue-i18n'
const { login } = useSanctumAuth();
const { t } = useI18n()

const minLengthPassword: number = 8;
const txtRequired: string = t('validations.required');
const txtEmail: string = t('validations.email');
const txtMin: string = t('validations.min', { min: minLengthPassword });

const schema = object({
  email: string().email(txtEmail).required(txtRequired),
  name: string().required(txtRequired),
  password: string()
    .min(minLengthPassword, txtMin)
    .required(txtRequired)
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  name: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  const dataForm = event.data;
  
  await login({
    email: dataForm.email,
    name: dataForm.name,
    password: dataForm.password
  });
}
</script>

<template>
  <UCard class="ring-0 shadow-2xl max-w-lg w-full">
    <UCardHeader>
      <h2 class="text-xl font-semibold text-center">{{ $t('register_account') }}</h2>
    </UCardHeader>

    <UCardBody class="space-y-4">
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

        <UFormGroup :label="$t('email')" name="email">
          <UInput v-model="state.email" icon="i-heroicons-envelope" placeholder="name@example.com" />
        </UFormGroup>

        <UFormGroup :label="$t('username')" name="username">
          <UInput v-model="state.name" icon="i-heroicons-envelope" placeholder="Username" />
        </UFormGroup>

        <UFormGroup :label="$t('password')" name="password">
          <UInput v-model="state.password" icon="i-heroicons-key" type="password" placeholder="********" />
        </UFormGroup>

        <div class="w-full max-w-40 m-auto">
          <UButton color="primary" block type="submit">
            {{ $t('sign_up') }}
          </UButton>
        </div>

      </UForm>

    </UCardBody>
  </UCard>
</template>
