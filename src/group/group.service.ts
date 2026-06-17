import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {

  constructor(private readonly groupRepository: GroupRepository) {}

  async findById(id: number){
    const group = await this.groupRepository.findById(id)
    
    if(!group)
      throw new NotFoundException()

    return group
  }

  async patch(id: number, name: string){
    const isUpdated = await this.groupRepository.patch(id, name);
    
    if(!isUpdated)
      throw new NotFoundException()
  }
  
}
