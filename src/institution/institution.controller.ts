import { Controller, Get } from "@nestjs/common";
import { InstitutionService } from "./institution.service";
import { InstitutionDto } from "./dto/institution.dto";
import { PublicRouter } from "src/auth/metadata/public.metadata";

@Controller("institutions")
export class InstitutionController {
    constructor(private readonly institutionService: InstitutionService)
    {}

    @PublicRouter()
    @Get()
    async findAll(): Promise<InstitutionDto[]> {
        return this.institutionService.findAll();
    }
    
}