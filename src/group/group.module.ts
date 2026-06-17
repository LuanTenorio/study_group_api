import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Database } from 'src/database/database.module';
import { GroupRepository } from './group.repository';

@Module({
    imports: [Database],
    controllers: [GroupController],
    providers: [
        GroupService, 
        GroupRepository
    ],
})
export class GroupModule {}
