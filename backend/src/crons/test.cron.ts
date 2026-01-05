import { CronJob } from "cron";

const handler = async () => {
    console.log("Hello from Cron");
};
export const testCron = new CronJob(" * * * 1 *", handler);
