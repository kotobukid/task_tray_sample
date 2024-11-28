<script setup lang="ts">
import * as Path from "@tauri-apps/api/path";
import {computed, onMounted, ref, watchEffect} from "vue";
import {dataDir} from "@tauri-apps/api/path";

const sep = ref(Path.sep());

onMounted(async () => {
  const dir = await dataDir();
  console.log(dir);
  const fontDir = await Path.fontDir();
  console.log(fontDir)
});
const bases = computed(() => {
  type DirectoryKeys = keyof typeof Path.BaseDirectory;

  return Object.keys(Path.BaseDirectory).filter(key => !isNaN(Number(key))).map((key) => {
    return {
      key,
      // 必ず `key` が `DirectoryKeys` であることを保証するためのキャスト
      value: Path.BaseDirectory[key as DirectoryKeys]
    }
  })
});

const funcs_promise = [
  "appCacheDir",
  "appConfigDir",
  "appDataDir",
  "appLocalDataDir",
  "appLogDir",
  "audioDir",
  "cacheDir",
  "configDir",
  "dataDir",
  "desktopDir",
  "documentDir",
  "downloadDir",
  "homeDir",
  "localDataDir",
  "pictureDir",
  "publicDir",
  "resourceDir",
  "tempDir",
  "templateDir",
  "videoDir"
];

// not supported on windows
// "executableDir",
// "fontDir",
// "runtimeDir",

const current_target = ref<string>(funcs_promise[0]);
const p = ref('');

watchEffect(async () => {
  if (current_target.value) {
    // @ts-ignore
    p.value = await Path[current_target.value]();
  }
});

const funcs = [
  "delimiter"
]

const utilities = [
  "basename",
  "extname",
  "dirname",
  "isAbsolute",
  "join",
  "normalize",
  "resolve",
  "resolveResource"
]

</script>

<template lang="pug">
  .paths
    h1 Directory Information
    .check
      select(v-model="current_target")
        option(v-for="func in funcs_promise" :value="func") {{ func }}
      br
      span.target_path {{ p }}


    ul
      li sep: {{ sep }}
      li(v-for="base in bases" :key="base.key") {{ base.key }}: {{ base.value }}
</template>

<style scoped lang="less">
.paths {
  background-color: #eee;
  outline: 1px solid grey;
}

span.target_path {
  font-weight: bold
}
</style>