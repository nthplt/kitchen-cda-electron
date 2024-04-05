import { app, BrowserWindow, ipcMain } from "electron";
import path, { join } from "path";
import { format } from "url";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function onReady() {
  const win = new BrowserWindow({
    width: 900,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      webSecurity: false,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });
  await win.loadURL(
    format({
      pathname: join(__dirname, "dist/kitchen-electron/browser/index.html"),
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

ipcMain.on("read-data", (event, fileName) => {
  fs.readFile(
    path.join(__dirname, "data", `${fileName}.json`),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        event.sender.send("read-data-reply", {
          error: "An error occurred while reading the file.",
        });
      } else {
        event.sender.send("read-data-reply", { data: JSON.parse(data) });
      }
    }
  );
});

ipcMain.on("read-data-by-id", (event, fileName, id) => {
  fs.readFile(
    path.join(__dirname, "data", `${fileName}.json`),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        event.sender.send("read-data-by-id-reply", {
          error: "An error occurred while reading the file.",
        });
      } else {
        event.sender.send("read-data-by-id-reply", {
          data: JSON.parse(data)[id],
        });
      }
    }
  );
});

ipcMain.on("add-data", (event, fileName, dataToSave) => {
  const filePath = path.join(__dirname, "data", `${fileName}.json`);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      event.sender.send("add-data-reply", {
        error: "An error occurred while reading the file.",
      });
    } else {
      const dataInFile = JSON.parse(data);
      const newId = (Object.keys(dataInFile).length + 1).toString();
      const newData = JSON.stringify({
        ...dataInFile,
        [newId]: dataToSave,
      });
      fs.writeFile(filePath, newData, (err) => {
        if (err) {
          event.sender.send("add-data-reply", {
            error: "An error occurred while writing the file.",
          });
          return;
        }

        event.sender.send("add-data-reply", {
          id: newId,
        });
      });
    }
  });
});
