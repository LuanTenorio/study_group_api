import { Module } from "@nestjs/common";
import { InstitutionController } from "./institution.controller";
import { InstitutionService } from "./institution.service";
import { InstitutionRepository } from "./institution.repository";
import { Database } from "src/database/database.module";

@Module({
    imports: [Database],
    controllers: [InstitutionController],
    providers: [InstitutionService, InstitutionRepository],
    exports: [InstitutionService]
})
export class InstitutionModule {}