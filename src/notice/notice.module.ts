import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { Database } from 'src/database/database.module';
import { NoticeRepository } from './notice.repository';

@Module({
    imports: [Database],
    controllers: [NoticeController],
    providers: [
        NoticeService, 
        NoticeRepository
    ],
})
export class NoticeModule {}
