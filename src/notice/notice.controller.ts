import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { NoticeService } from './notice.service';

@Controller("notice")
export class NoticeController {
  constructor(private readonly serviceService: NoticeService) {}

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number){
    return this.serviceService.findByGroupId(id)
  }

}
