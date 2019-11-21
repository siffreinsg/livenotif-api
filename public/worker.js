console.log("Service worker loaded.");

self.addEventListener('push', ev => {
    console.log("Push received:", ev)

    if (!ev.data) return console.log("Push event doesn't have any data.");

    let data;
    try {
        data = ev.data.json()
    } catch (ex) {
        console.log("Couldn't parse event as JSON.", data);

        data = {
            title: "Notification",
            body: ev.data.text(),
        }
    }

    const wait = self.registration.showNotification(data.title, data);
    ev.waitUntil(wait);
});
