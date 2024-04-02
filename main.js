const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

async function onReady() {
  win = new BrowserWindow({
    width: 900,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
    },
  });
  await win.loadURL(
    url.format({
      pathname: path.join(
        __dirname,
        "dist/kitchen-electron/browser/index.html"
      ),
      protocol: "file:",
      slashes: true,
    })
  );
}

app.whenReady().then(async () => {
  await onReady();

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});
