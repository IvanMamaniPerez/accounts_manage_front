<script setup lang="ts">
definePageMeta({
  middleware: ['sanctum:guest'],
})

import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { FetchError } from 'ofetch';
const { login } = useSanctumAuth();

const { t } = useI18n()

const minLengthPassword: number = 8;
const txtRequired: string = t('validations.required');
const txtEmail: string = t('validations.email');
const txtMin: string = t('validations.min', { min: minLengthPassword });

const schema = object({
  email: string().email(txtEmail).required(txtRequired),
  password: string()
    .min(minLengthPassword, txtMin)
    .required(txtRequired)
})

const form = ref()
let credentialsIncorrect = ref(false);
type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
  remember: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {

  const dataForm = event.data;
  
  try {
    await login({
      email: dataForm.email,
      password: dataForm.password
    });
  } catch (error) {

    if (error instanceof FetchError && error.response?.status === 422) {
      console.log(error.response?._data.errors)

      form.value.setErrors([{
        path: 'email',
        message: ' '
      },
      {
        path: 'password',
        message: ' '
      }])
      credentialsIncorrect.value = true;
    }
  }
}
</script>

<template>
  <UCard class="ring-0 shadow-none max-w-lg w-full dark:bg-gray-900">
    <UCardHeader>
      <h2 class="text-xl font-semibold text-center">{{ $t('access') }}</h2>
    </UCardHeader>

    <UCardBody class="space-y-4">
      <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup :label="$t('email')" name="email">
          <UInput v-model="state.email" icon="i-heroicons-envelope" placeholder="name@example.com" />
        </UFormGroup>

        <UFormGroup :label="$t('password')" name="password">
          <UInput v-model="state.password" icon="i-heroicons-key" type="password" placeholder="********" />
        </UFormGroup>

        <UFormGroup>
          <UCheckbox :label="$t('remember_me')" color="cyan" v-model="state.remember" />
        </UFormGroup>

        <UAlert v-if="credentialsIncorrect" icon="i-heroicons-exclamation-triangle" color="red" variant="solid" :title="$t('credentials_incorrect')" />

        <div class="w-full max-w-40 m-auto">
          <UButton color="primary" block type="submit">
            {{ $t('login') }}
          </UButton>
        </div>

        <div class="text-center">
          <ULink to="/auth/forgot-password" class="text-sm text-black dark:text-cyan-700 dark:hover:text-cyan-400">
            {{ $t('forgot_password') }}
          </ULink>
        </div>
      </UForm>

      <UDivider :label="$t('or').toUpperCase()" size="md" />

      <div class="space-y-4 flex flex-col justify-center w-full">
        <UButton color="secondary" :label="$t('login_with_google')" icon="i-simple-icons-google" block />
        <UButton color="secondary" :label="$t('login_with_facebook')" icon="i-simple-icons-facebook" block />

        <div class="text-center text-sm text-black dark:text-white">
          {{ $t('register_process.no_account') }}
          <ULink to="/auth/register" class="text-center text-sm text-black dark:text-cyan-700 dark:hover:text-cyan-400">
          {{ $t('register_here') }}
        </ULink>
        </div>
        
      </div>
    </UCardBody>
  </UCard>
</template>
