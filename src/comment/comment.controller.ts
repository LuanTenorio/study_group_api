import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number){
    return this.commentService.findByGroupId(id)
  }

}
