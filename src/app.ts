import { json } from "body-parser";
import e, * as express from "express";
import { PushSubscription, sendNotification, setVapidDetails } from "web-push";

import { log } from "./helpers/logger";

if (typeof process.env.NODE_ENV === "string") {
    log("TRACE", `NODE_ENV set to ${process.env.NODE_ENV}`);
} else {
    process.env.NODE_ENV = "development";
    log("TRACE", "NODE_ENV not set. Assuming a development environment.");
}

if (typeof process.env.PRIVATE_VAPID_KEY !== "string" || typeof process.env.PUBLIC_VAPID_KEY !== "string" || typeof process.env.SUBJECT_VAPID_HEADER !== "string") {
    log("ERROR", "No VAPID keys provided! See documentation for instructions.");
    process.exit();
} else {
    setVapidDetails(process.env.SUBJECT_VAPID_HEADER, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);
}

export const app: express.Application = e();

app.use(json());
app.use(express.static("./public"));

app.post("/subscribe", (req: express.Request, res: express.Response) => {
    const subscription: PushSubscription = req.body as PushSubscription;
    console.log(subscription);

    res.status(201)
        .json({});

    const payload: string = JSON.stringify({ title: "test" });

    sendNotification(subscription, payload)
        .catch((err: Error) => { console.error(err.stack); });
});

app.set("port", process.env.PORT);

app.listen(app.get("port"), () => {
    log("TRACE", "Express server listening on port 8000");
});
