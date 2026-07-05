import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { MaterialQuery } from './query.enum';
import { AreaDto } from './dto/area.dto';

@Injectable()
export class AreaRepository {

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async findAll() {
    const meets = await this.pool.query<AreaDto>(MaterialQuery.FIND_ALL)

    return meets.rows
  }

}
