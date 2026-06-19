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

  formatNotice(noticePg: NoticePGDto): NoticeDto {
    const {id, created_at, description, email, expiration_date, group_id, institution_id, name, user_id} = noticePg
    
    return {
      id, user_id, created_at, description, group_id, expiration_date,
      user: {
        email, id: user_id, institution_id, name
      }
    }
  }

}
