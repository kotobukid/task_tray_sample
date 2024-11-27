import {createApp} from "vue";
import App from "./App.vue";
// import {tray} from "@tauri-apps/api";
import {getVersion, getTauriVersion, getName} from '@tauri-apps/api/app';

const main = async () => {
    const appVersion = await getVersion();
    const tauriVersion = await getTauriVersion();
    const name = await getName();
    console.log({
        appVersion,
        tauriVersion,
        name,
    });

    // const _tray = await tray.TrayIcon.new({
    //     tooltip: 'new tooltip1',
    // });
    // console.log(_tray)

    createApp(App).mount("#app");
};
main();

