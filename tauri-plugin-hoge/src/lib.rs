use tauri::{
  plugin::{Builder, TauriPlugin},
  Manager, Runtime,
};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
mod models;

pub use error::{Error, Result};

#[cfg(desktop)]
use desktop::Hoge;
#[cfg(mobile)]
use mobile::Hoge;

/// Extensions to [`tauri::App`], [`tauri::AppHandle`] and [`tauri::Window`] to access the hoge APIs.
pub trait HogeExt<R: Runtime> {
  fn hoge(&self) -> &Hoge<R>;
}

impl<R: Runtime, T: Manager<R>> crate::HogeExt<R> for T {
  fn hoge(&self) -> &Hoge<R> {
    self.state::<Hoge<R>>().inner()
  }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("hoge")
    .invoke_handler(tauri::generate_handler![commands::ping])
    .setup(|app, api| {
      #[cfg(mobile)]
      let hoge = mobile::init(app, api)?;
      #[cfg(desktop)]
      let hoge = desktop::init(app, api)?;
      app.manage(hoge);
      Ok(())
    })
    .build()
}
