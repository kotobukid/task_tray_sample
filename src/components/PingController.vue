<script setup lang="ts">
import { ping } from 'tauri-plugin-hoge-api'
import { ref } from "vue";

// console.log({ping});

// const result = await ping();
// console.log(result);

const response = ref('')

const updateResponse = (returnValue) => {
  response.value += `[${new Date().toLocaleTimeString()}] ` + (typeof returnValue === 'string' ? returnValue : JSON.stringify(returnValue)) + '<br>'
}

const send_ping = async () => {
  ping("Pong!").then(updateResponse).catch(updateResponse);
}

</script>

<template lang="pug">
.ping_controller
  h1 Ping Plugin Controller
  button(@click="send_ping") send
  br
  span(v-html="response")
</template>
