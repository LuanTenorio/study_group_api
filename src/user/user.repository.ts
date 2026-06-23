import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { UserQuery } from './query.enum';
import { UserPGDto } from './dto/user_pg.dto';

@Injectable()
export class UserRepository {

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async findAll(group_id: number) {
    const meets = await this.pool.query<UserPGDto>(UserQuery.SELECT_ALL)

    return meets.rows
  }

}
