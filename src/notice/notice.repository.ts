import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { NoticeQuery } from './query.enum';
import { NoticePGDto } from './dto/notice_pg.dto';

@Injectable()
export class NoticeRepository {

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async findByGroupId(group_id: number) {
    const notices = await this.pool.query<NoticePGDto>(NoticeQuery.SELECT_BY_GROUP_ID, [group_id])

    return notices.rows
  }

  async findById(id: number){
    const notice = await this.pool.query<NoticePGDto>(NoticeQuery.SELECT_BY_ID, [id])
    return notice.rows[0]
  }

  async createNotice(title: string, user_id: number, group_id: number, description: string, expiration_date: Date) {
    const notice = await this.pool.query<NoticePGDto>(NoticeQuery.CREATE, [title, user_id, group_id, description, expiration_date])
    return notice.rows[0]
  }

  async updateNotice(title: string, id: number, description: string, expiration_date: Date) {
    const notice = await this.pool.query<NoticePGDto>(NoticeQuery.UPDATE, [title, description, expiration_date, id])
    return notice.rows[0]
  }

  async deleteNotice(id: number, group_id: number) {
    const notice = await this.pool.query<NoticePGDto>(NoticeQuery.DELETE, [id, group_id])
    return notice.rows[0]
  }
}
