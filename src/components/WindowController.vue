<script setup lang="ts">
// import {getCurrentWindow} from "@tauri-apps/api/window";
import {inject} from "vue";

const current: Window = inject('window')!;

console.log(current)

</script>

<template lang="pug">
  div WindowController
    br
    .buttons
      button(@click="current.emit('my-window-event', 'AAA')") a-AAA
      button(@click="current.emit('my-window-event', 'BBB')") a-BBB
      button(@click="current.emit('my-window-event', 'AAA')") b-AAA
      button(@click="current.emit('my-window-event', 'BBB')") b-BBB
      button(@click="current.emit('my-window-event', 'reload')") reload
      button(@click="current.emit('tauri://close-requested')") Close window
</template>

<style scoped lang="less">
button {
  margin-right: 4px;
  &:last-child {
    margin-right: 0;
  }
}
</style>