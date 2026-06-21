import { Module } from '@nestjs/common';
import { MeetController } from './meet.controller';
import { MeetService } from './meet.service';
import { Database } from 'src/database/database.module';
import { MeetRepository } from './meet.repository';

@Module({
    imports: [Database],
    controllers: [MeetController],
    providers: [
        MeetService, 
        MeetRepository
    ],
    exports:[
        MeetService
    ]
})
export class MeetModule {}
