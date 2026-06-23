import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { UserQuery } from './query.enum';
import { UserPGDto } from './dto/user_pg.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async findAll() {
    const users = await this.pool.query<UserPGDto>(UserQuery.GET_ALL)
    return users.rows
  }

  async create(data: CreateUserDto) {
    await this.pool.query<UserPGDto>(UserQuery.REGISTER, [data.institution_id, data.email, data.name, data.password])
    return data.name;
  }

  

}
