use tauri::Emitter;
use tauri_plugin_autostart::MacosLauncher;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(app: tauri::AppHandle, name: &str) -> String {
    match name {
        "close" => {
            let _ = app.emit("tauri://close-requested", "");
            "Shutting down...".to_string()
        }
        _ => {
            format!("Hello, {}! You've been greeted from Rust!", name)
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::AppleScript,
            Some(vec![""])
        ))
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
