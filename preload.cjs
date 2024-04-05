const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  readFile: (fileName) => {
    return new Promise((rs, rj) => {
      const listener = (event, data) => {
        ipcRenderer.removeListener("read-data-reply", listener);
        if (data.error) {
          rj(data.error);
        } else {
          rs(data.data);
        }
      };
      ipcRenderer.on("read-data-reply", listener);
      ipcRenderer.send("read-data", fileName);
    });
  },

  readFileEntityById: (fileName, id) => {
    return new Promise((rs, rj) => {
      const listener = (event, data) => {
        ipcRenderer.removeListener("read-data-by-id-reply", listener);
        if (data.error) {
          rj(data.error);
        } else {
          rs(data.data);
        }
      };
      ipcRenderer.on("read-data-by-id-reply", listener);
      ipcRenderer.send("read-data-by-id", fileName, id);
    });
  },

  addEntity: (fileName, entity) => {
    return new Promise((rs, rj) => {
      const listener = (event, data) => {
        ipcRenderer.removeListener("add-data-reply", listener);
        if (data.error) {
          rj(data.error);
        } else {
          rs(data.id);
        }
      };
      ipcRenderer.on("add-data-reply", listener);
      ipcRenderer.send("add-data", fileName, entity);
    });
  },
});
