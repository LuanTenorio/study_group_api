import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { UserPgDto } from './dto/user_pg.dto';
import { UserQuery } from './query.enum';
import { CreateUserPgDto } from './dto/create_user_pg.dto';

@Injectable()
export class UserRepository {
    constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

    async findByEmail(email: string): Promise<UserPgDto | undefined> {
        const user = await this.pool.query<UserPgDto>(UserQuery.SELECT_BY_EMAIL, [email])

        return user.rows[0];
    }

    async create(data: CreateUserPgDto): Promise<UserPgDto> {
        const user = await this.pool.query<UserPgDto>(UserQuery.INSERT, [data.institution_id, data.name, data.email, data.password_hash])
        
        return user.rows[0];
    }

}