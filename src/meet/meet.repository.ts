import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { MeetQuery } from './query.enum';
import { MeetDto } from './dto/meet.dto';

@Injectable()
export class MeetRepository {

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async findByGroupId(group_id: number) {
    const meets = await this.pool.query<MeetDto>(MeetQuery.SELECT_BY_GROUP_ID, [group_id])

    return meets.rows
  }

}
