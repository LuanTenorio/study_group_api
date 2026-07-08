import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { MaterialService } from './material.service';
import { FileInterceptor } from "@nestjs/platform-express";
import type { Response } from 'express';

@Controller("material")
export class MaterialController {
  constructor(private readonly serviceService: MaterialService) {}

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number){
    return this.serviceService.findByGroupId(id)
  }

  @Get("group/:id")
  async findByGroupId(@Param("id", ParseIntPipe) id: number){
    return this.serviceService.findByGroupId(id)
  }

  @Delete(":id/group/:group_id/material/delete")
  async deleteMaterial(@Param("id", ParseIntPipe) id: number, @Param("group_id", ParseIntPipe) group_id: number){
    return this.serviceService.deleteMaterial(id, group_id)
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  updateMaterial(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: any,
    @Body() body: any,
  ) {
    return this.serviceService.updateMaterial(id, body.title, body.description, file,
    );
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createMaterial(
    @UploadedFile() file: any,
    @Body() body: any,
  ) {
    return this.serviceService.createMaterial(body.title, Number(body.user_id), Number(body.group_id), file,
      body.description,
    );
  }

  @Get(':id/download')
  async download(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const material = await this.serviceService.download(id);
    res.setHeader('Content-Type', material.file_type);
    res.setHeader('Content-Length', material.file_size.toString());
    res.setHeader(
      'Content-Disposition',
      `inline; filename="material"`,
    );
    res.send(material.file_content);
  }
}
