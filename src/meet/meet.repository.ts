import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { MeetQuery } from './query.enum';
import { MeetPGDto } from './dto/meet_pg.dto';

@Injectable()
export class MeetRepository {

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async findByGroupId(group_id: number) {
    const meets = await this.pool.query<MeetPGDto>(MeetQuery.SELECT_BY_GROUP_ID, [group_id])

    return meets.rows
  }
  async findById(id: number){
    const meet = await this.pool.query<MeetPGDto>(MeetQuery.SELECT_BY_ID, [id])
    return meet.rows[0]
  }

  async createMeet(title: string, user_id: number, group_id: number, description: string, date_time: Date, location: string) {
    const meet = await this.pool.query<MeetPGDto>(MeetQuery.CREATE, [title, user_id, group_id, description, date_time, location])
    return meet.rows[0]
  }

  async updateMeet(id: number, title: string, description: string, date_time: Date, location: string) {
    const meet = await this.pool.query<MeetPGDto>(MeetQuery.UPDATE, [title, description, date_time, location, id])
    return meet.rows[0]
  }

  async deleteMeet(id: number, group_id: number) {
    const meet = await this.pool.query<MeetPGDto>(MeetQuery.DELETE, [id, group_id])
    return meet.rows[0]
  }
}
