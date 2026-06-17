import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { GroupService } from './group.service';
import { PatchGroupDto } from './dto/patch.dto';

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number){
    return this.groupService.findById(id)
  }

  @Patch(":id")
  async patch(@Param("id", ParseIntPipe) id: number, @Body() {name}: PatchGroupDto){
    return this.groupService.patch(id, name);
  }

}
