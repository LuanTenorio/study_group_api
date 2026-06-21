import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupRepository } from './group.repository';
import { CommentRepository } from 'src/comment/comment.repository';
import { CommentService } from 'src/comment/comment.service';
import { MaterialService } from 'src/material/material.service';
import { MeetService } from 'src/meet/meet.service';
import { NoticeService } from 'src/notice/notice.service';
import { GroupPgDto } from './dto/group_pg.dto';
import { GroupDto } from './dto/group.dto';

@Injectable()
export class GroupService {

  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly commentService: CommentService,
    private readonly materialService: MaterialService,
    private readonly meetService: MeetService,
    private readonly noticeService: NoticeService,

  ) {}

  async findById(id: number){
    const group = await this.groupRepository.findById(id)
    
    if(!group)
      throw new NotFoundException()

    return this.formatGroup(group)
  }

  async patch(id: number, name: string){
    const isUpdated = await this.groupRepository.patch(id, name);
    
    if(!isUpdated)
      throw new NotFoundException()
  }

  async getAllInformations(id: number){
    return Promise.all([
      this.commentService.findByGroupId(id),
      this.materialService.findByGroupId(id),
      this.meetService.findByGroupId(id),
      this.noticeService.findByGroupId(id)
    ])
  }

  async formatGroup(group: GroupPgDto): Promise<GroupDto>{
    const [comments, materials, meets, notices] = await this.getAllInformations(group.id)

    return {...group, comments, materials, meets, notices}
  }
  
}
