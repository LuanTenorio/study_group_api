import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CommentQuery } from './query.enum';
import { CommentPGDto } from './dto/comment_pg.dto';

@Injectable()
export class CommentRepository {

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async findByGroupId(group_id: number) {
    const meets = await this.pool.query<CommentPGDto>(CommentQuery.SELECT_BY_GROUP_ID, [group_id])

    return meets.rows
  }

}
