declare global {
    interface Window {
        api: Api;
    }
}

export interface Api {
    openUrl: (url: string) => void;
    quit: () => void;
}
