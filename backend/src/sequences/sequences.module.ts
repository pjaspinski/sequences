import { Module } from "@nestjs/common";
import { SequencesController } from "./sequences.controller";
import { SequencesService } from "./sequences.service";

@Module({
    providers: [SequencesService],
    controllers: [SequencesController],
})
export class SequencesModule {}
