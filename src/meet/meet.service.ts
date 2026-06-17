import { Injectable, NotFoundException } from '@nestjs/common';
import { MeetRepository } from './meet.repository';

@Injectable()
export class MeetService {

  constructor(private readonly meetRepository: MeetRepository) {}

  async findByGroupId(id: number){
    return this.meetRepository.findByGroupId(id)
  }

}
