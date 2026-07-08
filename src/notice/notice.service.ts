import { Injectable } from '@nestjs/common';
import { NoticeRepository } from './notice.repository';
import { NoticePGDto } from './dto/notice_pg.dto';
import { NoticeDto } from './dto/notice.dto';

@Injectable()
export class NoticeService {

  constructor(private readonly noticeRepository: NoticeRepository) {}

  async findByGroupId(id: number){
    const notices = await this.noticeRepository.findByGroupId(id)
    
    return notices.map(comment => this.formatNotice(comment))
  }

  async findById(id: number){
    const notice = await this.noticeRepository.findById(id)
    return this.formatNotice(notice)
  }

  async createNotice(title:string, user_id: number, group_id: number, description: string, expiration_date: Date){
    const notice = await this.noticeRepository.createNotice(title, user_id, group_id, description, expiration_date)
    return this.formatNotice(notice)
  }

  async updateNotice(title: string, id: number, description: string, expiration_date: Date){
    const notice = await this.noticeRepository.updateNotice(title, id, description, expiration_date)
    return this.formatNotice(notice)
  }

  async deleteNotice(id: number, group_id: number){
    const notice = await this.noticeRepository.deleteNotice(id, group_id)
    return this.formatNotice(notice)
  }

  formatNotice(noticePg: NoticePGDto): NoticeDto {
    const {id, title, created_at, description, email, expiration_date, group_id, institution_id, name, user_id} = noticePg
    
    return {
      id, title, user_id, created_at, description, group_id, expiration_date,
      user: {
        email, id: user_id, institution_id, name
      }
    }
  }

}
