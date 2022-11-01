import { app, ipcMain, shell } from "electron";

const urls = new Map([
    ["author", "https://pjaspinski.pl"],
    ["client", "http://127.0.0.1:3002"],
]);

export default () => {
    ipcMain.on("open-url", (_event, url) => {
        shell.openExternal(urls.get(url));
    });

    ipcMain.on("quit", () => {
        app.exit(0);
    });
};
