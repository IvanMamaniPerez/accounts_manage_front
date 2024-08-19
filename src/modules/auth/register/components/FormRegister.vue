<script setup lang="ts">
import * as Yup from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { FetchError } from 'ofetch';
import { useFormaterResponsesComposable } from '~/src/shared/composables/FormaterResponsesComposable';
import { useToastComposable } from '~/src/shared/composables/ToastComposable';

const { t, locale } = useI18n()
const minLengthPassword: number = 8;
const txtRequired: string = t('validations.required');
const txtEmail: string = t('validations.email');
const txtMin: string = t('validations.min', { min: minLengthPassword });
const form = ref()
const { formatErrorResponseForForms } = useFormaterResponsesComposable();
const client = useSanctumClient();
const { login } = useSanctumAuth();
const { showLoaderToast, showErrorToast, removeToast, showSuccessToast } = useToastComposable()

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

async function intentLogin(email: string, password: string) {
  try {
    await login({
      email: email,
      password: password
    });

  } catch (error) {
    /* TODO: add the opps error if the login is failed and navigateTo login */
    showErrorToast({ id: 'error:validation', title: t('opps') });
    navigateTo('/auth/login');
  }
}


async function onSubmit(event: FormSubmitEvent<Schema>) {
  showLoaderToast({
    id: 'register:loading',
    title: t('register_process.registering'),
  })
  const dataForm = event.data;
  try {
    await client('api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: dataForm.email,
        name: dataForm.username,
        locale: locale.value,
        password: dataForm.password,
        password_confirmation: dataForm.password_confirmation,
      })
    });

    showSuccessToast({ id: 'register:success', title: t('register_process.success') });

    await intentLogin(dataForm.email, dataForm.password);

  } catch (error) {

    if (error instanceof FetchError && error.response?.status === 422) {

      const errors = formatErrorResponseForForms(error.data)

      form.value.setErrors(errors)

    } else {
      showErrorToast({
        id: 'register:error',
        title: t('register_process.error'),
      })
    }
  } finally {
    removeToast('register:loading');
  }


}
</script>

<template>
  <UCard class="ring-0 shadow-2xl max-w-lg w-full">
    <UCardHeader>
      <h2 class="text-xl font-semibold text-center">{{ $t('register_account') }}</h2>
    </UCardHeader>

    <UCardBody class="space-y-4">
      <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

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
