import { InjectRedis } from "@liaoliaots/nestjs-redis";
import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class SequencesService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async redisPut(key: string, value: string): Promise<string> {
        await this.redis.set(key, value);
        return "Done!";
    }

    async redisGet(key: string): Promise<string> {
        return await this.redis.get(key);
    }
}
