import { Injectable } from "@nestjs/common";
import { InstitutionRepository } from "./institution.repository";
import { InstitutionDto } from "./dto/institution.dto";

@Injectable()
export class InstitutionService {
    constructor (private readonly institutionRepository: InstitutionRepository) 
    {}

    async findAll(): Promise<InstitutionDto[]> {
        return this.institutionRepository.findAll();
    }
    
    async findById(institution_id: number): Promise<InstitutionDto | undefined> {
        return this.institutionRepository.findById(institution_id);
    }
    
}