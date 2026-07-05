import { Controller, Get } from "@nestjs/common";
import { InstitutionService } from "./institution.service";
import { InstitutionDto } from "./dto/institution.dto";

@Controller("institutions")
export class InstitutionController {
    constructor(private readonly institutionService: InstitutionService)
    {}

    @Get()
    async findAll(): Promise<InstitutionDto[]> {
        return this.institutionService.findAll();
    }
    
}