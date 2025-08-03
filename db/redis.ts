import { Redis } from "ioredis";

const redis = new Redis(<string> process.env.REDIS_URL);

export default redis