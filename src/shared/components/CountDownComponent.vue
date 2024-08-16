<template>
  <div class="inline-block">
    <span class="text-blue-500 dark:text-indigo-500" v-text="stringTimer"></span>
  </div>
</template>

<script lang="ts" setup>

/* TODO[epic=fix-basic]: This component is only working with minutes and seconds, should review and test with hours, days, months, and years 
  this compomoent is used in many places, so it should be tested in all the places where it is used 
*/

const props = defineProps<{
  initialSeconds: number,
  format?: 'hh:mm:ss' | 'mm:ss'
}>()

const format = props.format || 'mm:ss';

const emit = defineEmits<{
  (event: 'finish'): void,
  (event: 'remainig_seconds', payload: { seconds: number }): void
}>()

let remainig = ref(props.initialSeconds)

function initTimer() {
  const interval = setInterval(() => {

    remainig.value--
    emit('remainig_seconds', { seconds: remainig.value })

    if (remainig.value <= 0) {

      clearInterval(interval)
      emit('finish')

    }
  }, 1000)
}

const currentSeconds = computed(() => {
  return remainig.value % 60
})

const currentMinutes = computed(() => {
  return Math.floor(remainig.value / 60)
})

const currentHours = computed(() => {
  return Math.floor(remainig.value / 3600)
})


const stringTimer = computed(() => {
  const hours = `${String(currentHours.value).padStart(2, '0')}:`;
  const minutes = `${String(currentMinutes.value).padStart(2, '0')}:`;
  const seconds = `${String(currentSeconds.value).padStart(2, '0')}`;

  if (format === 'hh:mm:ss') {
    return `${hours}${minutes}${seconds}`
  } else if (format === 'mm:ss') {
    return `${minutes}${seconds}`
  }

  return `${hours}${minutes}${seconds}`

})

onMounted(() => {
  initTimer()
})
</script>

<style></style>