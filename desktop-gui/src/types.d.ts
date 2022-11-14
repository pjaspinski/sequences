declare global {
    interface Window {
        api: Api;
    }
}

export type URL = "client" | "author";

export interface Api {
    openUrl: (url: URL) => void;
    quit: () => void;
    onServerStarted: (callback: () => void) => void;
}
