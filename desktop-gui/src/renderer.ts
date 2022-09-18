import "./index.css";

window.api.onServerStarted(() => {
    document.getElementById("url").innerHTML = "http://127.0.0.1:3002";
    document.getElementById("open-btn").classList.remove("disabled");
});

document.getElementById("open-btn").onclick = () => {
    window.api.openUrl("http://127.0.0.1:3002");
};

document.getElementById("quit-btn").onclick = () => {
    window.api.quit();
};

document.getElementById("pjaspinski").onclick = () => {
    window.api.openUrl("https://pjaspinski.pl");
};
