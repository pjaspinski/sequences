import "./index.css";

document.getElementById("open-btn").onclick = () => {
    window.api.openUrl("http://127.0.0.1:3001");
};

document.getElementById("quit-btn").onclick = () => {
    window.api.quit();
};

document.getElementById("pjaspinski").onclick = () => {
    window.api.openUrl("https://pjaspinski.pl");
};
