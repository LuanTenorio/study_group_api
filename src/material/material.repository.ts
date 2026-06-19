import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { MaterialQuery } from './query.enum';
import { MaterialPGDto as MaterialPGDto } from './dto/material_pg.dto';

@Injectable()
export class MaterialRepository {

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async findByGroupId(group_id: number) {
    const meets = await this.pool.query<MaterialPGDto>(MaterialQuery.SELECT_BY_GROUP_ID, [group_id])

    return meets.rows
  }

}
