import { ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseError, Pool } from 'pg';
import { GroupQuery } from './query.enum';
import { GroupPgDto } from './dto/group_pg.dto';
import { CreateGroupDto } from './dto/create_group.dto';
import { UpdateGroupDto } from './dto/update_group.dto';

@Injectable()
export class GroupRepository {

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async findById(id: number) {
    const group = await this.pool.query<GroupPgDto>(GroupQuery.SELECT_BY_ID, [id])

    return group.rows[0]
  }

  async getUserRole(groupId: number, userId: number): Promise<string | undefined>{
    const queryResult = await this.pool.query<{role: string}>(GroupQuery.CHECK_IF_OWNER, [groupId, userId])
    return queryResult.rows[0]?.role
  }

  async create(userId: number, {name, areas}: CreateGroupDto){
    try{
      const group = await this.pool.query<GroupPgDto>(GroupQuery.CREATE, [name, areas, userId])
      return group.rows[0]
    }catch (error){
      if(error instanceof DatabaseError && error.code === "23505")
        throw new ConflictException("A group with that name already exists")
      
      console.log(error)
      throw new InternalServerErrorException()
    }
  }

  async delete(id: number){
    const {rowCount} = await this.pool.query<GroupPgDto>(GroupQuery.DELETE, [id])
    
    return rowCount != null && rowCount > 0
  }

  async findAll(): Promise<any[]> {
    const result = await this.pool.query(GroupQuery.FIND_ALL);
    return result.rows; 
  }
  
  async update(groupId: number, dto: UpdateGroupDto){
    try{
      return await this.pool.query(GroupQuery.UPDATE, [groupId, dto.name, dto.areas])
    } catch(error){
      console.log(error)
      throw new InternalServerErrorException()
    }
  }

}
