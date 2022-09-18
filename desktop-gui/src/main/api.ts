import { app, ipcMain, shell } from "electron";

export default () => {
    ipcMain.on("open-url", (_event, url) => {
        shell.openExternal(url);
    });

    ipcMain.on("quit", () => {
        app.exit(0);
    });
};
