import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    openUrl: (url: string) => ipcRenderer.send("open-url", url),
    quit: () => ipcRenderer.send("quit"),
    onServerStarted: (callback: () => void) => ipcRenderer.on("server-started", callback),
});
