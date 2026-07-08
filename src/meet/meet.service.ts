import { Injectable } from '@nestjs/common';
import { MeetRepository } from './meet.repository';
import { MeetPGDto } from './dto/meet_pg.dto';
import { MeetDto } from './dto/meet.dto';

@Injectable()
export class MeetService {

  constructor(private readonly meetRepository: MeetRepository) {}

  async findByGroupId(id: number): Promise<MeetDto[]>{
    const meets = await this.meetRepository.findByGroupId(id)
    return meets.map((meet) => this.formatMeet(meet))
  }

  async findById(id: number){
    const meet = await this.meetRepository.findById(id)
    return this.formatMeet(meet)
  }

  async createMeet(title: string, user_id: number, group_id: number, description: string, date_time: Date, location: string){
    const meet = await this.meetRepository.createMeet(title, user_id, group_id, description, date_time, location)
    return this.formatMeet(meet)
  }

  async updateMeet(id: number, title: string, description: string, date_time: Date, location: string){
    const meet = await this.meetRepository.updateMeet(id, title, description, date_time, location)
    return this.formatMeet(meet)
  }

  async deleteMeet(id: number, group_id: number){
    const meet = await this.meetRepository.deleteMeet(id, group_id)
    return this.formatMeet(meet)
  }

  formatMeet(meetPg: MeetPGDto): MeetDto {
    const {id, title, description, group_id, date_time,email, location, institution_id, name, user_id} = meetPg
    return {
      id, title, description, group_id, date_time, location, user_id,
      user: {
        email, id: user_id, institution_id, name
      }
    }
  }
}
