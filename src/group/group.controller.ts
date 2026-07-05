import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { PatchGroupDto } from './dto/patch.dto';
import { GroupCardDto } from './dto/group_card.dto';
import { UserId } from 'src/auth/param/userId.param';
import { CreateGroupDto } from './dto/create_group.dto';

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get("/all")
  async getFeed(): Promise<GroupCardDto[]> {
    return this.groupService.getFeedGroups();
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number){
    return this.groupService.findById(id)
  }
  
  @Post()
  async create(@UserId() userId: number, @Body() dto: CreateGroupDto){
    return this.groupService.create(userId, dto);
  }

  @Patch(":id")
  async patch(@Param("id", ParseIntPipe) id: number, @Body() {name}: PatchGroupDto){
    return this.groupService.patch(id, name);
  }

 

}
