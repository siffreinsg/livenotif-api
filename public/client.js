const publicVapidKey = "BMTlyZADte7E04qeO6KI5oqWosWsinecI_byfLzrfmwhLcSUGz8oTQfw1HvuI34y-wczyc9tgmWQBamcfVilCzU";

if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("Registering service worker");
    navigator.serviceWorker.register('worker.js');

    navigator.serviceWorker.ready
        .then((registration) => {
            console.log("Service worker ready. Registering it to Push Manager...", registration);

            const options = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            };

            // BRAVE BROWSER: .subscribe() returns a promise which will never resolves (see github issues on notifications)
            // it works on chrome
            return registration.pushManager.subscribe(options);
        })
        .then((subscription) => {
            console.log("Subscription success! Reaching server...", subscription);

            return fetch('/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'content-type': 'application/json'
                }
            })
        })
        .then((resp) => {
            console.log("Server response.", resp);
        });
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
