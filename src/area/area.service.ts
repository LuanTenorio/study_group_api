import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { AreaRepository } from './area.repository';

@Injectable()
export class AreaService {

  constructor(private readonly areaRepository: AreaRepository){}

  create(createAreaDto: CreateAreaDto) {
    return 'This action adds a new area';
  }

  findAll() {
    return this.areaRepository.findAll();
  }

  findAreasByGroup(groupId: number){
    return this.areaRepository.findAreasByGroup(groupId)
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
