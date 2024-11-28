<script setup lang="ts">
import { dataDir } from '@tauri-apps/api/path';
import { LazyStore } from '@tauri-apps/plugin-store';
import {ref, onMounted} from "vue";

const store = ref<LazyStore | null>(null);

onMounted(async () => {
  store.value = new LazyStore('store.json');

  const key0 = await store.value!.get('key0');
  console.log(key0);
});

const set0 = async () => {
  // nullチェックを追加
  if (store.value) {
    await store.value.set('key0', 'value0');
    console.log(store.value);
  }
}

const set1 = async () => {
  // nullチェックを追加
  if (store.value) {
    await store.value.set('key1', 'value1');
    console.log(store.value);
  }
}

const get0 = async () => {
  // nullチェックを追加
  if (store.value) {
    const v = await store.value.get('key0');
    console.log(store.value);
    console.log(v);
  }
}

const get1 = async () => {
  // nullチェックを追加
  if (store.value) {
    const v = await store.value.get('key1');
    console.log(store.value);
    console.log(v);
  }
}
const save_store = async () => {
  store.value?.save();
}
</script>

<template lang="pug">
  Suspense
    template(#default)
      .store-front STORE FROMT
        ul
          li
            button(@click="save_store") save
          li
            button(@click="set0") set0
          li
            button(@click="get0") get0
          li
            button(@click="set1") set1
          li
            button(@click="get1") get1
    template(#fallback)
      span loading...
</template>

<style scoped lang="less">
.store-front {
  outline: 1px solid #dd5656;
}
</style>