<script setup lang="ts">
import {computed, onMounted, type Ref, ref} from "vue";
import {enable, disable, isEnabled} from "@tauri-apps/plugin-autostart";

const turn_enable = async (state: boolean) => {
  if (state) {
    await enable();
  } else {
    await disable();
  }
  is_active.value = await isEnabled() ? 'yes' : 'no';
}

const load_5sec = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}

const is_active: Ref<'yes' | 'no'> = ref('no');

onMounted(async () => {
　 is_active.value = await isEnabled() ? 'yes' : 'no';
})

await load_5sec()

const button_active = computed(() => {
  return (target: "yes" | "no"): boolean => {
    return target === is_active.value;
  }
})
</script>

<template lang="pug">
  .auto_start_controller
    h1 Auto Start
    Suspense
      template(#default)
        .button_group
          button(:data-active="button_active('yes')" @click="turn_enable(true)") ON
          button(:data-active="button_active('no')" @click="turn_enable(false)") OFF
      template(#fallback)
        span Loading...
</template>

<style scoped lang="less">
.button_group {
  //border: 1px solid grey;
  //border-radius: 5px;

  button {
    &[data-active="true"] {
      color: red;
    }

    &[data-active="false"] {
      color: black;
    }


    border: 1px solid grey;
    border-right-width: 0;
    cursor: pointer;

    width: 100px;
    padding: 5px 0;

    &:hover {
      background-color: #dedeff;
    }

    &:active {
      background-color: #c8c8ff;
    }

    &:first-child {
      border-radius: 5px 0 0 5px;
    }

    &:last-child {
      border-radius: 0 5px 5px 0;
      border-right-width: 1px;
    }
  }
}
</style>