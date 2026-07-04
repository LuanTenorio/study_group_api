import { Inject, Injectable } from "@nestjs/common";
import { InstitutionDto } from "./dto/institution.dto";
import { Pool } from "pg";
import { InstitutionQuery } from "./query.enum";

@Injectable()
export class InstitutionRepository {
    constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

    async findAll(): Promise<InstitutionDto[]> {
        const result = await this.pool.query<InstitutionDto>(InstitutionQuery.SELECT_ALL)

        return result.rows;
    }

}