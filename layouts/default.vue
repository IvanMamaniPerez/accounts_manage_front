<template>
  <div class="bg-white dark:bg-gray-900">
    <AppHeader />
    <slot />
    <UNotifications>
      <template #title="{ title }">
        <span v-html="title" />
      </template>

      <template #description="{ description }">
        <span v-html="description" />
      </template>
    </UNotifications>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
#__nuxt,
#__nuxt>div {
  min-height: 100vh;
}

/* HTML: <div class="toast__loader"></div> */
.toast__loader {
  margin-left: 1rem;
  display: inline-block;
  position: absolute;
  top: 22%;
  width: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, #ffa516 94%, #0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, #ffa516);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: l13 1s infinite linear;
}

@keyframes l13 {
  100% {
    transform: rotate(1turn)
  }
}
</style>