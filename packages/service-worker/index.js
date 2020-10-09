console.log('js start')
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").then(registration => {
            console.log("register success");
        }, err => {
            console.log("register error", err);
        })
    })
}
