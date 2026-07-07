import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { NoticeService } from './notice.service';

@Controller("notice")
export class NoticeController {
  constructor(private readonly serviceService: NoticeService) {}

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number){
    return this.serviceService.findByGroupId(id)
  }

  @Get("group/:id")
  async findByGroupId(@Param("id", ParseIntPipe) id: number){
    return this.serviceService.findByGroupId(id)
  }

  @Delete(":id/group/:group_id/notice/delete")
  async deleteNotice(@Param("id", ParseIntPipe) id: number, @Param("group_id", ParseIntPipe) group_id: number){
    return this.serviceService.deleteNotice(id, group_id)
  }

  @Post()
  async createNotice(@Body() data: any){
    return this.serviceService.createNotice(data.user_id, data.group_id, data.description, data.expiration_date)
  }

  @Patch(":id")
  async updateNotice(@Param("id", ParseIntPipe) id: number, @Body() data: any){
    return this.serviceService.updateNotice(id, data.description, data.expiration_date)
  }

}
