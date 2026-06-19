import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { NoticeQuery } from './query.enum';
import { NoticePGDto } from './dto/notice_pg.dto';

@Injectable()
export class NoticeRepository {

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async findByGroupId(group_id: number) {
    const meets = await this.pool.query<NoticePGDto>(NoticeQuery.SELECT_BY_GROUP_ID, [group_id])

    return meets.rows
  }

}
