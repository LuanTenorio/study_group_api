import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { UserPgDto } from './dto/user_pg.dto';
import { UserQuery } from './query.enum';

@Injectable()
export class UserRepository {
    constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

    async findByEmail(email: string) {
        const user = await this.pool.query<UserPgDto>(UserQuery.SELECT_BY_EMAIL, [email])

        return user.rows[0];
    }

}