<template>
  <UButton :class=finalClasses :type=type>
    {{ text ?? '' }}
  </UButton>
</template>

<script lang="ts" setup>
import { ComponentTypesEnum } from '../enums/component_types_enum';
import type { ComponentClassesBaseType } from '../types/ComponentClassesBaseType';

const props = defineProps<{
  as?: ComponentTypesEnum;
  text?: string;
  class?: string;
  type?: string;
}>();

const asType = props.as ?? ComponentTypesEnum.primary;

// TODO[epic=base-components] - Add more classes for each type and mode (dark/light)
const baseClasses: ComponentClassesBaseType = {
  [ComponentTypesEnum.primary]: [
    'dark:bg-hardGray',
    'dark:text-white',
    'dark:hover:bg-hardGray',
    'dark:hover:text-white',
  ],
  [ComponentTypesEnum.primaryOutline]: ['bg-tertiary text-white'],
  [ComponentTypesEnum.secondary]: [
    'dark:bg-mediumGray',
    'text-white'
  ],
  [ComponentTypesEnum.secondaryOutline]: ['bg-danger text-white'],
}

const finalClasses = baseClasses[asType];

/* TODO[epic=base-components] */
// finalClasses.push(props.class ?? []);
</script>

<style></style>