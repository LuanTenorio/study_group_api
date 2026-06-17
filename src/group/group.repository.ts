import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { GroupQuery } from './query.enum';
import { GroupDto } from './dto/group.dto';

@Injectable()
export class GroupRepository {

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async findById(id: number) {
    const group = await this.pool.query<GroupDto>(GroupQuery.SELECT_BY_ID, [id])

    return group.rows[0]
  }

  async patch(id: number, name: string){
    const {rowCount} = await this.pool.query<GroupDto>(GroupQuery.UPDATE, [id, name])

    return rowCount != null && rowCount > 0
  }

  async create(name: string){
    const group = await this.pool.query<GroupDto>(GroupQuery.CREATE, [name])
    return group.rows[0]
  }

  async delete(id: number){
    const {rowCount} = await this.pool.query<GroupDto>(GroupQuery.DELETE, [id])
    
    return rowCount != null && rowCount > 0
  }
  
}
