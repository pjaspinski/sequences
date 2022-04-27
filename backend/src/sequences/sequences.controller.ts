import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { SequencesService } from "./sequences.service";

@Controller("sequences")
export class SequencesController {
    constructor(private readonly sequencesService: SequencesService) {}

    @Get(":key")
    async redisGet(@Param() params): Promise<string> {
        return this.sequencesService.redisGet(params.key);
    }

    @Put()
    async redisPut(@Body() body): Promise<string> {
        return this.sequencesService.redisPut(body.key, body.value);
    }
}
