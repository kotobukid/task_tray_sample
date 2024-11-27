import {createApp} from "vue";
import App from "./App.vue";
// import {tray} from "@tauri-apps/api";
import {getVersion, getTauriVersion, getName} from '@tauri-apps/api/app';
import {getCurrentWindow} from "@tauri-apps/api/window";
import {ref} from "vue";
import {EventName} from "@tauri-apps/api/event";

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

    const currentWindow = ref(getCurrentWindow());

    currentWindow.value.listen('my-window-event', ({event, payload}: { event: EventName, payload: string }): void => {
        switch (payload) {
            case 'reload':
                window.location.reload();
                break;
            default:
                console.log(event, payload);
                break;
        }
    });

    const app = createApp(App);
    app.provide("window", currentWindow);
    app.mount("#app");
};
main();

