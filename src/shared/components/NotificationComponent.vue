<template>

  <UNotifications>
    <template #title="{ title }">
      <span v-html="title" />
    </template>

    <template #description="{ description }">
      <span v-html="description" />
    </template>
  </UNotifications>

</template>

<script lang="ts" setup>

</script>

<style>
.toast__loader {
  margin-left: 1rem;
  display: inline-block;
  position: absolute;
  top: 22%;
  width: 25px;
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



.wrapper__success {
  margin-left: 1rem;
  height: 25px;
  top: 22%;
  right: 3rem;
  display: inline-block;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  background-color: transparent;
  position: absolute;
}

.checkmark__circle__success {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #42b9c1;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards
}

.checkmark__success {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both
}

.checkmark__check__success {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0
  }
}

@keyframes scale {

  0%,
  100% {
    transform: none
  }

  50% {
    transform: scale3d(1.1, 1.1, 1)
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #7ac142
  }
}
</style>