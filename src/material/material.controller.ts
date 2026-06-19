import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MaterialService } from './material.service';

@Controller("material")
export class MaterialController {
  constructor(private readonly serviceService: MaterialService) {}

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number){
    return this.serviceService.findByGroupId(id)
  }

}
