import { setVapidDetails } from "web-push";

import { log } from "./helpers/logger";
import { server } from "./webserver";

if (typeof process.env.NODE_ENV === "string") {
    log("TRACE", `NODE_ENV set to ${process.env.NODE_ENV}`);
} else {
    process.env.NODE_ENV = "development";
    log("TRACE", "NODE_ENV not set. Assuming a development environment.");
}

if (typeof process.env.PRIVATE_VAPID_KEY !== "string"
    || typeof process.env.PUBLIC_VAPID_KEY !== "string"
    || typeof process.env.SUBJECT_VAPID_HEADER !== "string") {
    log("ERROR", "No VAPID keys provided! See documentation for instructions.");
    process.exit();
} else {
    setVapidDetails(process.env.SUBJECT_VAPID_HEADER, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);
}

server.listen(server.get("port"));
