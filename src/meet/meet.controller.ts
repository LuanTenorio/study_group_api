import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MeetService } from './meet.service';

@Controller("meet")
export class MeetController {
  constructor(private readonly meetService: MeetService) {}

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number){
    return this.meetService.findByGroupId(id)
  }

}
