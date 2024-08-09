<script setup lang="ts">
import * as Yup from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const minLengthPassword: number = 8;
const txtRequired: string = t('validations.required');
const txtEmail: string = t('validations.email');
const txtMin: string = t('validations.min', { min: minLengthPassword });

const schema = Yup.object().shape({
  email: Yup.string().email(txtEmail).required(txtRequired),
  username: Yup.string().required(txtRequired),
  password: Yup.string()
    .min(minLengthPassword, txtMin)
    .required(txtRequired),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], t('validations.password_must_match'))
    .required(txtRequired),
})



type Schema = Yup.InferType<typeof schema>

const state = reactive({
  email: undefined,
  username: undefined,
  password: undefined,
  password_confirmation: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {

  const dataForm = event.data;

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
          <UInput v-model="state.username" icon="i-heroicons-user" placeholder="Username" />
        </UFormGroup>

        <UFormGroup :label="$t('password')" name="password">
          <UInput v-model="state.password" icon="i-heroicons-key" type="password" placeholder="********" />
        </UFormGroup>

        <UFormGroup :label="$t('confirm_password')" name="password_confirmation">
          <UInput v-model="state.password_confirmation" icon="i-heroicons-key" type="password" placeholder="********" />
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
