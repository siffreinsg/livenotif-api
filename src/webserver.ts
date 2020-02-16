import { json } from "body-parser";
import e, * as express from "express";
import { PushSubscription, sendNotification, setVapidDetails } from "web-push";

import { log } from "./helpers/logger";

export const server: express.Application = e();
export const subscriptions: PushSubscription[] = [];

server.use(json());
server.use(express.static("./public"));

server.post("/subscribe", (req: express.Request, res: express.Response) => {
    const subscription: PushSubscription = req.body as PushSubscription;
    console.log(subscription);

    res.status(201)
        .json({});

    const payload: string = JSON.stringify({ title: "test" });

    sendNotification(subscription, payload)
        .catch((err: Error) => { console.error(err.stack); });
});

server.set("port", process.env.PORT);

export interface NotificationContent {

}

export const sendNotif = (content: NotificationContent): void =>
    sendNotification(subscription, payload);
