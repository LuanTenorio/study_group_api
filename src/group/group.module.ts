import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Database } from 'src/database/database.module';
import { GroupRepository } from './group.repository';
import { CommentModule } from 'src/comment/comment.module';
import { MaterialModule } from 'src/material/material.module';
import { MeetModule } from 'src/meet/meet.module';
import { NoticeModule } from 'src/notice/notice.module';
import { AreaModule } from 'src/area/area.module';

@Module({
    imports: [Database, CommentModule, MaterialModule, MeetModule, NoticeModule, AreaModule],
    controllers: [GroupController],
    providers: [
        GroupService, 
        GroupRepository
    ],
})
export class GroupModule {}
