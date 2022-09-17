import {
    app,
    BrowserWindow,
    Menu,
    MenuItemConstructorOptions,
    Notification,
    Tray,
    shell,
} from "electron";
import path from "path";
import iconSmall from "../../logos/logo16.png";
import iconBig from "../../logos/logo256.png";
import api from "./api";
import { start } from "../../backend";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
    app.quit();
}

let mainWindow: BrowserWindow;
let closedOnce = false;
let isQuitting = false;
const iconSmallPath = path.join(__dirname, iconSmall);
const iconBigPath = path.join(__dirname, iconBig);

app.setAppUserModelId("Sequences");

const createWindow = (): void => {
    const titleBarOverlay =
        process.platform === "win32"
            ? {
                  color: "#161a1d",
                  symbolColor: "#969A9C",
                  height: 43,
              }
            : true;

    mainWindow = new BrowserWindow({
        height: 500,
        width: 400,
        frame: false,
        resizable: false,
        maximizable: false,
        backgroundColor: "#161a1d",
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
        titleBarStyle: "hidden",
        titleBarOverlay,
    });

    api();

    mainWindow.menuBarVisible = false;
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    process.env.NODE_ENV === "development" && mainWindow.webContents.openDevTools();

    mainWindow.on("close", (event: Event) => {
        if (isQuitting) return;
        event.preventDefault();
        mainWindow.hide();
        if (!closedOnce) {
            closedOnce = true;
            new Notification({
                title: "App minimized to tray.",
                body: "Click the icon to open it.",
                icon: iconBigPath,
            }).show();
        }
    });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(() => {
    attachTrayMenu();
    start();
});

const attachTrayMenu = () => {
    const trayIcon = new Tray(iconSmallPath);

    const trayMenuTemplate: MenuItemConstructorOptions[] = [
        {
            label: "Open window",
            click: () => mainWindow.show(),
        },
        {
            label: "Open browser page",
            click: () => shell.openExternal("http://127.0.0.1:3001"),
        },
        {
            type: "separator",
        },
        {
            label: "Quit",
            click: () => {
                isQuitting = true;
                app.quit();
            },
        },
    ];

    const trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
    trayIcon.setContextMenu(trayMenu);
    trayIcon.setToolTip("Tellyo Controller");
};
