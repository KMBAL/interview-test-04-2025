import * as dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(__dirname, '../../../.env')})

export const environments = {
    qa: {
        kmbalurl: process.env.KMBALURL || "",
    },

}as const;
const env = process.env.ENV || "qa";
export const envConfig = environments[env as keyof typeof environments];

if (!envConfig) {
    throw new Error(`Invalid or unsupported environment: ${env}`);
}
