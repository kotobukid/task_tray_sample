<script setup lang="ts">
import {ref, onMounted, nextTick} from "vue";
import {defaultWindowIcon} from "@tauri-apps/api/app";
import {image} from "@tauri-apps/api"
import {useImage} from "../composables/image.ts";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const width = ref(100);
const height = ref(100);

onMounted(async () => {
  if (canvasRef.value) {
    const ctx = canvasRef.value.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    }

    const icon: image.Image | null = await defaultWindowIcon();

    if (icon) {
      const imageData: ImageData = await useImage().parse(icon);
      width.value = imageData.width;
      height.value = imageData.height;

      if (ctx) {
        await nextTick(() => {
          ctx.putImageData(imageData, 0, 0);
        });
      }
    }
  }
});
</script>

<template lang="pug">
  h1 Default Icon
  canvas(ref="canvasRef" :width="width" :height="height")
</template>

<style scoped lang="less">
canvas {
  outline: 1px solid #000;
}
</style>