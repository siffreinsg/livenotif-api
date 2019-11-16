enum LogLevel {
    ERROR, WARN, INFO, TRACE,
}

/**
 * Format logs and filter debug messages based on node env
 * @param level Level of the error
 * @param text Error message
 * @param optionalParams optional parameters passed directly to console.log
 */
export function log(level: keyof typeof LogLevel, text: string, ...optionalParams: unknown[]): void {
    const num: number = LogLevel[level];

    const spaces: string = " ".repeat(5 - level.length);
    const toLog: string = `[${new Date().toLocaleString()}] [${level}]${spaces} ${text}`;

    switch (level) {
        case "ERROR":
        case "WARN":
            console.error(toLog, ...optionalParams);
            break;
        case "TRACE":
            if (process.env.NODE_ENV === "development") {
                console.log(toLog, ...optionalParams);
            }
            break;
        default:
            console.log(toLog, ...optionalParams);
    }
}
