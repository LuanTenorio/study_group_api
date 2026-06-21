import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Database } from 'src/database/database.module';
import { CommentRepository } from './comment.repository';

@Module({
    imports: [Database],
    controllers: [CommentController],
    providers: [
        CommentService, 
        CommentRepository
    ],
    exports: [
        CommentService
    ]
})
export class CommentModule {}
