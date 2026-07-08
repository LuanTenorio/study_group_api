import { Controller, Get, Param, ParseIntPipe, Delete, Patch, Post, Body } from '@nestjs/common';
import { MeetService } from './meet.service';

@Controller("meet")
export class MeetController {
  constructor(private readonly serviceService: MeetService) {}

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number){
    return this.serviceService.findByGroupId(id)
  }

  @Get("group/:id")
  async findByGroupId(@Param("id", ParseIntPipe) id: number){
    return this.serviceService.findByGroupId(id)
  }

  @Delete(":id/group/:group_id/meet/delete")
  async deleteMeet(@Param("id", ParseIntPipe) id: number, @Param("group_id", ParseIntPipe) group_id: number){
    return this.serviceService.deleteMeet(id, group_id)
  }

  @Post()
  async createMeet(@Body() data: any){
    return this.serviceService.createMeet(data.title, data.user_id, data.group_id, data.description, data.date_time, data.location)
  }

  @Patch(":id")
  async updateMeet(@Param("id", ParseIntPipe) id: number, @Body() data: any){
    return this.serviceService.updateMeet(id, data.title, data.description, data.date_time, data.location)
  }

}
