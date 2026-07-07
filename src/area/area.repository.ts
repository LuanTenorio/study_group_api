import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { AreaQuery } from './query.enum';
import { AreaDto } from './dto/area.dto';

@Injectable()
export class AreaRepository {

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async findAll() {
    const meets = await this.pool.query<AreaDto>(AreaQuery.FIND_ALL)

    return meets.rows
  }

  async findAreasByGroup(groupId: number){
    const areas = await this.pool.query<AreaDto>(AreaQuery.FIND_BY_GROUP, [groupId])
    
    return areas.rows
  }

}
