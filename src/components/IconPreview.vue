<script setup lang="ts">
import { ref, onMounted } from "vue";
import {defaultWindowIcon} from "@tauri-apps/api/app";
import {useImage} from "../composables/image.ts";

const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(async () => {
  if (canvasRef.value) {
    const ctx = canvasRef.value.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    }

    const icon = await defaultWindowIcon();
    await useImage().parse(icon, canvasRef!);
  }
});
</script>

<template lang="pug">
canvas(ref="canvasRef" width="32" height="32")
</template>

<style scoped lang="less">
canvas {
  outline: 1px solid #000;
}
</style>