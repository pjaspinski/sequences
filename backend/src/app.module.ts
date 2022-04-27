import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisModule } from "@liaoliaots/nestjs-redis";
import { SequencesModule } from "./sequences/sequences.module";

@Module({
    imports: [
        RedisModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                config: {
                    host: config.get<string>("DB_HOST"),
                    port: parseInt(config.get<string>("DB_PORT")),
                    password: config.get<string>("DB_PASSWORD"),
                },
            }),
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        SequencesModule,
    ],
})
export class AppModule {}
