import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { GroupRepository } from './group.repository';
import { CommentService } from 'src/comment/comment.service';
import { MaterialService } from 'src/material/material.service';
import { MeetService } from 'src/meet/meet.service';
import { NoticeService } from 'src/notice/notice.service';
import { GroupPgDto } from './dto/group_pg.dto';
import { GroupDto } from './dto/group.dto';
import { GroupCardDto } from './dto/group_card.dto';
import { CreateGroupDto } from './dto/create_group.dto';
import { AreaService } from 'src/area/area.service';
import { UpdateGroupDto } from './dto/update_group.dto';
import { GroupPreviewDto } from './dto/preview_group.dto';

@Injectable()
export class GroupService {

  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly commentService: CommentService,
    private readonly materialService: MaterialService,
    private readonly meetService: MeetService,
    private readonly noticeService: NoticeService,
    private readonly areaService: AreaService
  ) {}

  async findById(id: number, userId: number){
    const group = await this.groupRepository.findById(id)
    
    if(!group)
      throw new NotFoundException()

    const role = await this.groupRepository.getUserRole(id, userId)

    if(!role)
      throw new UnauthorizedException("User is not subscribed to the group")

    return this.formatGroup(group, role)
  }

  async isUserRegistered(groupId: number, userId: number){
    const role = await this.groupRepository.getUserRole(groupId, userId)

    return !!role
  }

  async isOwner(groupId: number, userId: number){
    const role = await this.groupRepository.getUserRole(groupId, userId)

    return role === "owner"
  }

  async delete(groupId: number, userId: number){
    const isOwner = await this.isOwner(groupId, userId)

    if(!isOwner)
      throw new UnauthorizedException("Only administrators can delete")

    return this.groupRepository.delete(groupId)
  }

  async getAllInformations(id: number){
    return Promise.all([
      this.commentService.findByGroupId(id),
      this.materialService.findByGroupId(id),
      this.meetService.findByGroupId(id),
      this.noticeService.findByGroupId(id),
      this.areaService.findAreasByGroup(id)
    ])
  }

  async formatGroup(group: GroupPgDto, role: string): Promise<GroupDto>{
    const [comments, materials, meets, notices, areas] = await this.getAllInformations(group.id)

    return {...group, comments, materials, meets, notices, role, areas}
  }

  async create(userId: number, dto: CreateGroupDto){
    return this.groupRepository.create(userId, dto);
  }

   async getFeedGroups(): Promise<GroupCardDto[]> {
    const rawData = await this.groupRepository.findAll();

    // formata cada linha do banco para a interface do front end
    return rawData.map(row => ({
      id: row.id,
      title: row.title,
      institution: row.institution || 'Geral', // fallback caso não tenha instituição
      area: row.area || 'Diversos',
      members: row.members || 0,
      nextMeeting: this.formatMeetingDate(row.next_meeting)
    }));
  }

  async getPreview(id: number): Promise<GroupPreviewDto> {
    const row = await this.groupRepository.findPreviewById(id);
 
    if (!row)
      throw new NotFoundException('Grupo não encontrado');
 
    return {
      id: row.id,
      name: row.title,
      institution: row.institution || 'Geral',
      area: row.area || 'Diversos',
      members: row.members || 0
    };
  }

  async enroll(userId: number, groupId: number): Promise<void> {
    try {
      await this.groupRepository.enroll(userId, groupId);
    } catch (error: any) {
      if (error.code === 'P0003') {
        throw new ConflictException('Você já está inscrito nesse grupo');
      }
      if (error.code === 'P0002') {
        throw new NotFoundException('Grupo não encontrado');
      }
      throw error;
    }
  }

  async unenroll(userId: number, groupId: number){
    const isOwner = await this.isOwner(groupId, userId)

    if(isOwner)
      throw new ConflictException("Administrators cannot leave the group")
    
    return this.groupRepository.unenroll(userId, groupId);
  }

  private formatMeetingDate(dateString: string | null): string {
    if (!dateString) return 'Sem encontros agendados';

    const meetingDate = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // formatação para a hora
    const time = meetingDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // testa se o encontro é hoje, amanhã ou outro dia da semana
    if (meetingDate.toDateString() === today.toDateString()) {
      return `Hoje, ${time}`;
    } else if (meetingDate.toDateString() === tomorrow.toDateString()) {
      return `Amanhã, ${time}`;
    } else {
      // formatação para a data
      const dayName = meetingDate.toLocaleDateString('pt-BR', { weekday: 'long' });
      const dayCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1).split('-')[0];
      return `${dayCapitalized}, ${time}`;
    }
  }

  async update(groupId: number, userId: number, dto: UpdateGroupDto){
    const isOwner = await this.isOwner(groupId, userId)

    if(!isOwner)
      throw new UnauthorizedException("Only administrators can patch")

    return await this.groupRepository.update(groupId, dto);
  }

  async getMyGroups(userId: number): Promise<GroupCardDto[]> {
    const rawData = await this.groupRepository.findMyGroups(userId);

    return rawData.map(row => ({
      id: row.id,
      title: row.title,
      institution: row.institution || 'Geral',
      area: row.area || 'Diversos',
      members: row.members || 0,
      nextMeeting: this.formatMeetingDate(row.next_meeting) 
    }));
  }
  
}
