import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentPGDto } from './dto/comment_pg.dto';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {

  constructor(private readonly commentRepository: CommentRepository) {}

  async findByGroupId(id: number){
    const comments = await this.commentRepository.findByGroupId(id)
    
    return comments.map(comment => this.formatComment(comment))
  }

  formatComment(commentPg: CommentPGDto): CommentDto {
    const {id, created_at, description, email, group_id, institution_id, name, user_id} = commentPg
    
    return {
      id, created_at, description, group_id,
      user: {
        email, id: user_id, institution_id, name
      }
    }
  }

}
