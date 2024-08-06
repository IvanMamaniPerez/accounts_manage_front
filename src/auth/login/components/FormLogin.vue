<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const schema = object({
  email: string().email('Debe ser un email').required('Requerido'),
  password: string()
    .min(8, 'Debe tener al menos 8 caracteres')
    .required('Requerido')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
  remember: false
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>

<template>
  <UCard class="ring-0 shadow-2xl max-w-lg w-full">
    <UCardHeader>
      <h2 class="text-xl font-semibold text-center">{{ $t('hello', {name: "este es el value"}) }}</h2>
    </UCardHeader>

    <UCardBody>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email"  icon="i-heroicons-envelope" placeholder="name@example.com" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" placeholder="********"/>
        </UFormGroup>

        <UFormGroup>
          <UCheckbox color="emerald" v-model="state.remember" label="Recordarme" />
        </UFormGroup>

        <div class="w-full max-w-40 m-auto">
          <UButton color="primary" block type="submit">
            Iniciar Sesion
          </UButton>
        </div>

      </UForm>
    </UCardBody>
  </UCard>
</template>
