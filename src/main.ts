import {createApp} from "vue";
import App from "./App.vue";
// import {tray} from "@tauri-apps/api";
import {getVersion, getTauriVersion, getName} from '@tauri-apps/api/app';
import {getCurrentWindow} from "@tauri-apps/api/window";
import {EventName, UnlistenFn} from "@tauri-apps/api/event";

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

    const currentWindow = getCurrentWindow();

    await currentWindow.listen('my-window-event', ({event, payload}: { event: EventName, payload: string }): void => {
        switch (payload) {
            case 'reload':
                window.location.reload();
                break;
            default:
                console.log(event, payload);
                break;
        }
    });

    const event_names: string[] = [
        'tauri://move',
        'tauri://resize',
        // 'tauri://close-requested',
    ];
    event_names.forEach(event_name => {
        currentWindow.listen(event_name, (event: any) => {
            console.log(event);
        });
    })

    const unlisten: UnlistenFn = await currentWindow.listen('tauri://close-requested', async (event: any) => {
        if (event.event === 'tauri://close-requested') {
            const do_close = confirm('Do you really want to close the window?');
            if (!do_close) {
                event.preventDefault();
            } else {
                unlisten();
                await currentWindow.destroy();
            }
        } else {
            console.log(event);
        }
    });

    const app = createApp(App);
    app.provide("window", currentWindow);
    app.mount("#app");
};

main().then();

