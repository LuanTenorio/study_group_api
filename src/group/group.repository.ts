import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { GroupQuery } from './query.enum';
import { GroupPgDto } from './dto/group_pg.dto';

@Injectable()
export class GroupRepository {

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async findById(id: number) {
    const group = await this.pool.query<GroupPgDto>(GroupQuery.SELECT_BY_ID, [id])

    return group.rows[0]
  }

  async patch(id: number, name: string){
    const {rowCount} = await this.pool.query<GroupPgDto>(GroupQuery.UPDATE, [id, name])

    return rowCount != null && rowCount > 0
  }

  async create(name: string){
    const group = await this.pool.query<GroupPgDto>(GroupQuery.CREATE, [name])
    return group.rows[0]
  }

  async delete(id: number){
    const {rowCount} = await this.pool.query<GroupPgDto>(GroupQuery.DELETE, [id])
    
    return rowCount != null && rowCount > 0
  }
  
}
